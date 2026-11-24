const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    customer: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "user",
      default: null,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },

    status: {
      type: String,
      enum: ["open", "assigned", "resolved", "closed", "reopened"],
      default: "open",
    },

    attachment_file: {
      type: String,
      default: null,
    },
    attachment_public_id: {
      type: String,
      default: null,
    },

    resolution: {
      type: String,
      default: "",
    },

    resolvedAt: Date,
    closedAt: Date,
    isDeleted: {
        type: Boolean,
        default: false

    },
    deletedAt: {
        type: Date
    },

    feedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      comment: String,
      submittedAt: Date,
    },
  },
  { timestamps: true },
);

const ticketModel = mongoose.model("ticket", ticketSchema);
module.exports = ticketModel;
