const express = require("express");
const router = express.Router();
const asyncHandeler = require("../middleware/asyncHandeler.middleware");
const ticketController = require("../controller/ticket.controller");
const validation = require("../validations/index");
const ticketValidation = require("../validations/ticket.validation");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../utils/cloudinary");
const httpStatusCode = require("../utils/httpStatusCode");

const uploadMiddleware = (req, res, next) => {
  upload.single("attachment_file")(req, res, (err) => {
    if (err) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        message: err.message || "File upload error",
      });
    }
    next();
  });
};

// Static paths BEFORE parametric :id routes
router.get(
  "/tickets/assign",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("agent"),
  asyncHandeler(ticketController.getAssignTicketByAgent),
);

router.post(
  "/tickets",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("admin", "customer"),
  uploadMiddleware,
  validation.validate(ticketValidation.createTicket),
  asyncHandeler(ticketController.createTicket),
);

router.get(
  "/tickets",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("admin", "customer", "agent"),
  asyncHandeler(ticketController.getAllTicket),
);

router.get(
  "/tickets/:id",
  authMiddleware.verifyToken,
  asyncHandeler(ticketController.getTicketById),
);

router.patch(
  "/tickets/:id",
  authMiddleware.verifyToken,
  uploadMiddleware,
  validation.validate(ticketValidation.updateTicket),
  asyncHandeler(ticketController.updateTicket),
);

router.delete(
  "/tickets/:id",
  authMiddleware.verifyToken,
  asyncHandeler(ticketController.deleteTicket),
);

router.patch(
  "/tickets/:id/assign",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("admin"),
  asyncHandeler(ticketController.assignTicket),
);

router.patch(
  "/tickets/:id/resolve",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("agent"),
  asyncHandeler(ticketController.resolvedTicket),
);

router.patch(
  "/tickets/:id/closed",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("agent"),
  asyncHandeler(ticketController.closedTicket),
);

router.patch(
  "/tickets/:id/priority",
  authMiddleware.verifyToken,
  authMiddleware.roleCheck("admin"),
  validation.validate(ticketValidation.updatePriority),
  asyncHandeler(ticketController.updateTicketPriority),
);

module.exports = router;
