const { validationResult } = require("express-validator");

const { Session, User } = require("../models");
const {
  getFilterreadAllSessions,
  getFilterReadSession,
  getFilterUpdateSession,
  getFilterDeleteSession,
} = require("../filters/session");

// read all entities
exports.readAllSessions = async (req, res, next) => {
  // filter
  const filter = getFilterreadAllSessions(req);

  try {
    const sessions = await Session.findAll({
      where: filter,
      include: [
        { model: User, as: "therapist" },
        { model: User, as: "client" },
      ],
      order: [["startTime", "ASC"]],
    });
    res.json(sessions);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching sessions", details: error.message });
  }
};

// create an entity
exports.createSession = async (req, res, next) => {
  console.log("creating session...");

  const curUser = req.user;

  // validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newSession = {
    therapistId: curUser.id,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    status: req.body.status,
    notes: req.body.notes,
  };

  try {
    const session = await Session.create(newSession);
    res.status(201).json(session);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating session", details: error.message });
  }
};

// create an entity
exports.readSessionById = async (req, res, next) => {
  // validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // filter
  let filter = getFilterReadSession(req);

  try {
    const session = await Session.findOne({
      where: filter,
      include: [
        { model: User, as: "therapist" },
        { model: User, as: "client" },
      ],
    });
    if (!session) return res.status(404).json({ error: "Session not found" });
    res.json(session);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching session", details: error.message });
  }
};

// update an entity
exports.updateSession = async (req, res, next) => {
  console.log("updating session...");
  console.log("req.user from controller: updateSession");
  console.log(req.user);

  // validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // filter
  let filter = getFilterUpdateSession(req);

  const updatedSession = {};
  if (req.body.therapistId) updatedSession.therapist_id = req.body.therapistId;
  if (req.body.clientId) updatedSession.client_id = req.body.clientId;
  if (req.body.startTime) updatedSession.startTime = req.body.startTime;
  if (req.body.endTime) updatedSession.endTime = req.body.endTime;
  if (req.body.status) updatedSession.status = req.body.status;
  if (req.body.notes) updatedSession.notes = req.body.notes;

  // TODO: clean this! need a better solution/also can be a security issue, as we don't have granular permission control over the fields/simple solution: different route for different status changes, so it can be authorized on route level
  // update clientId if the user is a client and the session is set to scheduled
  if (req.user.role === "client" && req.body.status === "scheduled")
    updatedSession.clientId = req.user.id;
  if (req.user.role === "client" && req.body.status === "available")
    updatedSession.clientId = null;

  try {
    const session = await Session.findOne({ where: filter });
    if (!session) return res.status(404).json({ error: "Session not found" });

    await session.update(updatedSession);
    res.json(session);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating session", details: error.message });
  }
};

// delete an entity
exports.deleteSession = async (req, res, next) => {
  // validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // filter
  const filter = getFilterDeleteSession(req);

  try {
    const session = await Session.findOne({ where: filter });
    if (!session)
      return res
        .status(404)
        .json({ error: "Session not found or not up for delete!" });

    await session.destroy();
    res.json({ message: "Session deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting session", details: error.message });
  }
};
