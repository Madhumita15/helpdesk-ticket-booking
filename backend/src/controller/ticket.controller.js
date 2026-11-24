const {
  createTicketService,
  getAllTicketService,
  assignTicketService,
  getAssignTaskByAgentService,
  resolvedTicketService,
  closedTicketService,
  getTicketByIdService,
  updateTicketByService,
  deleteTicketService,
  updatePriorityService,
} = require("../service/ticket.service");
const httpStatusCode = require("../utils/httpStatusCode");


class TicketController {
  async createTicket(req, res) {
    const { title, description, customer, priority } = req.body;
    const user = req.user;
    const file = req.file;

    const ticket = await createTicketService({
      title,
      description,
      customer,
      priority,
      user,
      file,
    });
    return res.status(httpStatusCode.CREATED).json({
      success: true,
      message: "Ticket created successfully",
      data: ticket,
    });
  }


  async updateTicket(req, res) {
    const { title, description, priority } = req.body;
    const user = req.user;
    const file = req.file;
    const id = req.params.id

    const ticket = await updateTicketByService({
      title,
      description,
      priority,
      user,
      file,
      id
    });
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Ticket updated successfully",
      data: ticket,
    });
  }


  async deleteTicket(req, res) {
    const id = req.params.id;
    const user = req.user
    await deleteTicketService({id, user});
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Ticket deleted successfully!",
    });
  }

  async getTicketById(req, res) {
    const id = req.params.id;
    const ticket = await getTicketByIdService(id);
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Ticket fetched successfully!",
      data: ticket,
    });
  }



  async getAllTicket(req, res) {
    const user = req.user;
    const tickets = await getAllTicketService(user);
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Tickets fetched successfully!",
      data: tickets,
    });
  }

  async assignTicket(req, res) {
    const id = req.params.id;
    const { assignedTo } = req.body;
    if (!assignedTo) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "AssignedTo is required",
      });
    }
    await assignTicketService({ assignedTo, id });
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Tickets assigned to agent successfully!",
    });
  }

  async getAssignTicketByAgent(req, res) {
    const userId = req.user._id;
    const ticktes = await getAssignTaskByAgentService(userId);
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Get Assign Tickets by agent successfully!",
      data: ticktes,
    });
  }

  async resolvedTicket(req, res) {
    const id = req.params.id;
    const userId = req.user._id;
    const ticket = await resolvedTicketService({ id, userId });
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Resolved ticket successfully!!",
      data: ticket,
    });
  }

  async closedTicket(req, res) {
    const id = req.params.id;
    const userId = req.user._id;
    const ticket = await closedTicketService({ id, userId });
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Closed ticket successfully!!",
      data: ticket,
    });
  }

  async updateTicketPriority(req, res){
    const id = req.params.id;
    const {priority} = req.body
    const ticket = await updatePriorityService({id, priority});
    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "Update priority ticket successfully!",
      data: ticket,
    });

  }
}

module.exports = new TicketController();
