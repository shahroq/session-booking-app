const express = require("express");

const sessionController = require("../controllers/session");
const {
  sessionValidationNewData,
  sessionValidationUpdateData,
  sessionValidationId,
} = require("../validators/session");
const { isAuth, isTherapist } = require("../middlewares/auth");

const router = express.Router();

// defining session routes
router.get("/", isAuth, sessionController.readAllSessions);
router.post(
  "/",
  isAuth,
  isTherapist,
  sessionValidationNewData,
  sessionController.createSession
);
router.get(
  "/:id",
  isAuth,
  sessionValidationId,
  sessionController.readSessionById
);
router.put(
  "/:id",
  isAuth,
  // isTherapist,
  sessionValidationId,
  sessionValidationUpdateData,
  sessionController.updateSession
);
router.delete(
  "/:id",
  isAuth,
  isTherapist,
  sessionValidationId,
  sessionController.deleteSession
);

module.exports = router;
