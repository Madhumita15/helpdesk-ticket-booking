const mongoose = require("mongoose");
const Ticket = require("../models/ticket.model");
const User = require("../models/user.model");
const cloudinary = require("../config/cloudinary.config");
const httpStatusCode = require("../utils/httpStatusCode");

const createTicketService = async ({
  title,
  description,
  user,
  customer,
  priority,
  file,
}) => {
  const newTicket = new Ticket({
    title: title,
    description: description,
    createdBy: user._id,
    customer: user.role === "customer" ? user._id : customer,
    priority: priority,
    attachment_file: file ? file.path : null,
    attachment_public_id: file ? file.filename : null,
  });

  const ticket = await newTicket.save();
  return ticket;
};

const getTicketByIdService = async (id) => {
  const ticket = await Ticket.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "createdByUser",
      },
    },

    {
      $unwind: "$createdByUser",
    },
    {
      $lookup: {
        from: "users",
        localField: "customer",
        foreignField: "_id",
        as: "customerUser",
      },
    },
    {
      $unwind: "$customerUser",
    },
    {
      $lookup: {
        from: "users",
        localField: "assignedTo",
        foreignField: "_id",
        as: "assignedToUser",
      },
    },
    {
      $project: {
        "createdByUser.password": 0,
        "createdByUser.refreshToken": 0,
        "customerUser.password": 0,
        "customerUser.refreshToken": 0,
        "assignedToUser.refreshToken": 0,
        "assignedToUser.password": 0,
      },
    },
  ]);
  if (ticket.length === 0) {
    const error = new Error("Ticket not found");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }
  return ticket[0];
};

const updateTicketByService = async ({
  title,
  description,
  user,
  priority,
  id,
  file,
}) => {
  const query = { _id: id, isDeleted: false };
  if (user.role === "customer") {
    query.createdBy = user._id;
  }
  const ticket = await Ticket.findOne(query);
  if (!ticket) {
    const error = new Error("Ticket not found or not allowed");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }

  let oldfile;

  if (title !== undefined) {
    ticket.title = title;
  }

  if (description !== undefined) {
    ticket.description = description;
  }
  if (priority !== undefined) {
    ticket.priority = priority;
  }
  if (file) {
    if (ticket.attachment_file) {
      oldfile = ticket.attachment_public_id;
    }
    ticket.attachment_file = file.path;
    ticket.attachment_public_id = file.filename;
  }

  const updatedTicket = await ticket.save();
  if (oldfile) {
    await cloudinary.uploader.destroy(oldfile);
  }
  return updatedTicket;
};

const deleteTicketService = async ({ id, user }) => {
  const query = { _id: id, isDeleted: false };
  if (user.role === "customer") {
    query.createdBy = user._id;
  }
  const ticket = await Ticket.findOne(query);

  if (!ticket) {
    const error = new Error("Ticket not found or cannot be deleted");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }

  ticket.isDeleted = true;
  ticket.deletedAt = new Date();

  await ticket.save();

  return ticket;
};

const getAllTicketService = async (user) => {
  const matchStage = {};
  matchStage.isDeleted = false;

  if (user.role === "customer") {
    matchStage.customer = new mongoose.Types.ObjectId(user._id);
  }

  const tickets = await Ticket.aggregate([
    {
      $match: matchStage,
    },
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "createdByUser",
      },
    },
    {
      $unwind: "$createdByUser",
    },

    {
      $lookup: {
        from: "users",
        localField: "customer",
        foreignField: "_id",
        as: "customerUser",
      },
    },
    {
      $unwind: "$customerUser",
    },
    {
      $project: {
        "createdByUser.password": 0,
        "createdByUser.refreshToken": 0,
        "customerUser.password": 0,
        "customerUser.refreshToken": 0,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]);

  return tickets;
};

const assignTicketService = async ({ assignedTo, id }) => {
  const agent = await User.findOne({
    _id: assignedTo,
    role: "agent",
  });

  if (!agent) {
    const error = new Error("Agent not found");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }

  const ticket = await Ticket.findOneAndUpdate(
    {
      _id: id,
      status: "open",
      isDeleted: false,
    },
    {
      $set: {
        assignedTo,
        status: "assigned",
      },
    },
    {
      new: true,
      runValidators: true,
    },
  );
  if (!ticket) {
    const error = new Error("ticket not found");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }

  return ticket;
};

const getAssignTaskByAgentService = async (userId) => {
  const agent = await User.findById(userId);
  if (!agent) {
    const error = new Error("Agent not found");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }

  const tickets = await Ticket.find({
    assignedTo: userId,
  }).populate("customer", "name email isActive");

  return tickets;
};

const resolvedTicketService = async ({ id, userId }) => {
  const ticket = await Ticket.findOneAndUpdate(
    {
      _id: id,
      status: "assigned",
      assignedTo: userId,
    },
    {
      $set: {
        resolvedDate: new Date(),
        status: "resolved",
      },
    },
    {
      new: true,
      runValidators: true,
    },
  );
  if (!ticket) {
    const existingTicket = await Ticket.findById(id);

    if (!existingTicket) {
      const error = new Error("Ticket not found");
      error.statusCode = httpStatusCode.NOT_FOUND;
      throw error;
    }

    const error = new Error(
      `Cannot change ticket status from ${existingTicket.status} to resolved`,
    );

    error.statusCode = httpStatusCode.BAD_REQUEST;
    throw error;
  }

  return ticket;
};

const closedTicketService = async ({ id, userId }) => {
  const ticket = await Ticket.findOneAndUpdate(
    {
      _id: id,
      status: "resolved",
      assignedTo: userId,
    },
    {
      $set: {
        closedDate: new Date(),
        status: "closed",
      },
    },
    {
      new: true,
      runValidators: true,
    },
  );
  if (!ticket) {
    const existingTicket = await Ticket.findById(id);

    if (!existingTicket) {
      const error = new Error("Ticket not found");
      error.statusCode = httpStatusCode.NOT_FOUND;
      throw error;
    }

    const error = new Error(
      `Cannot change ticket status from ${existingTicket.status} to closed`,
    );

    error.statusCode = httpStatusCode.BAD_REQUEST;
    throw error;
  }

  return ticket;
};

const updatePriorityService = async ({ id, priority }) => {
  const ticket = await Ticket.findById(id);
  if (!ticket) {
    const error = new Error("Ticket not found");
    error.statusCode = httpStatusCode.NOT_FOUND;
    throw error;
  }

  ticket.priority = priority;
  const updatedTicket = await ticket.save();
  return updatedTicket;
};

module.exports = {
  updatePriorityService,
  createTicketService,
  getAllTicketService,
  assignTicketService,
  getAssignTaskByAgentService,
  resolvedTicketService,
  closedTicketService,
  getTicketByIdService,
  updateTicketByService,
  deleteTicketService,
};
