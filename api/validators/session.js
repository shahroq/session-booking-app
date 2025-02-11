const { body, query, param } = require("express-validator");
const { Session } = require("../models");

exports.sessionValidationNewData = [
  //body("therapistId").isInt().withMessage("Therapist ID must be an integer"),
  body("clientId")
    .optional()
    .isInt()
    .withMessage("Client ID must be an integer"),

  /* 
  TODO: more validation needed:  
    - check if provided time slot does not intersect with existing sessions
    - check if therapistId/clientId is valid (necessary?)
    - check if therapistId is the same as the authenticated user (necessary?)
    ...
  */
  body("startTime")
    .isISO8601()
    .withMessage("Start time must be a valid ISO 8601 datetime")
    .custom((value) => {
      if (new Date(value) < new Date()) {
        throw new Error("Start time must be in the future");
      }
      return true;
    }),

  /* 
  TODO: more validation needed:  
    - check if it is on the same day, and after the start time, and create a reasonable duration (1-2 hours?)
    - check if provided time slot does not intersect with existing sessions
    - check if therapistId/clientId is valid (necessary?)
    - check if therapistId is the same as the authenticated user (necessary?)
    ...
  */
  body("endTime")
    .isISO8601()
    .withMessage("End time must be a valid ISO 8601 datetime")
    .custom((value) => {
      if (new Date(value) < new Date()) {
        throw new Error("End time must be in the future");
      }
      return true;
    }),

  body("status")
    .isIn(["available", "scheduled", "completed"])
    .withMessage("Status must be 'available', 'scheduled' or 'completed'"),
  body("notes").optional().isString().withMessage("Notes must be a string"),
];

exports.sessionValidationUpdateData = [
  body("clientId")
    .optional()
    .isInt()
    .withMessage("Client ID must be an integer"),

  body("startTime")
    .optional()
    .isISO8601()
    .withMessage("Start time must be a valid ISO 8601 datetime")
    .custom((value) => {
      if (new Date(value) < new Date()) {
        throw new Error("Start time must be in the future");
      }
      return true;
    }),

  body("endTime")
    .optional()
    .isISO8601()
    .withMessage("End time must be a valid ISO 8601 datetime")
    .custom((value) => {
      if (new Date(value) < new Date()) {
        throw new Error("End time must be in the future");
      }
      return true;
    }),

  body("status")
    .isIn(["available", "scheduled", "completed"])
    .withMessage("Status must be 'available', 'scheduled' or 'completed'")
    // compare the newStatus with current status, and see if it makes sense
    // TODO: clean this mess!
    .custom(async (newStatus, { req }) => {
      const sessionId = req.params.id;
      if (!sessionId) throw new Error("Session ID is required");

      const session = await Session.findByPk(sessionId);
      if (!session) throw new Error("Session not found");

      const currentStatus = session.status;
      console.log(`currentStatus: ${currentStatus}, newStatus: ${newStatus}`);

      // COMPLETE the session (therapists only)
      // if new status is 'completed', check if it is already 'scheduled'
      if (newStatus === "completed" && currentStatus !== "scheduled") {
        throw new Error(
          "Status must be 'scheduled' to be changed to 'completed' [2 to 3]"
        );
      }

      // CANCEL the session (both clients & therapists)
      // if new status is 'scheduled', check if it is already 'available'
      if (newStatus === "scheduled" && currentStatus !== "available") {
        throw new Error(
          "Status must be 'available' to be changed to 'scheduled' [1 to 2]"
        );
      }

      // BOOK the session (clients only)
      // if new status is 'available', check if it is already 'scheduled'
      if (newStatus === "available" && currentStatus !== "scheduled") {
        throw new Error(
          "Status must be 'scheduled' to be changed to 'available' [2 to 1]"
        );
      }

      return true;
    }),

  body("notes").optional().isString().withMessage("Notes must be a string"),
];

// Validation for ID parameters
exports.sessionValidationId = [
  param("id").isInt().withMessage("Session ID must be an integer"),
];
