const { Op } = require("sequelize");

// TODO: better approach for filtering? middleware?

exports.getFilterreadAllSessions = (req) => {
  const curUser = req.user || { id: 0, name: "", role: "", iat: 0, exp: 0 };

  let filter = { id: req.params.id };
  if (curUser.role === "therapist") {
    filter = {
      therapistId: curUser.id,
    };
  } else if (curUser.role === "client") {
    // filter session with client id and empty client id
    // where (clientId is null and startTime is greater than now) OR clientId is curUser.id
    filter = {
      [Op.or]: [
        {
          clientId: null,
          startTime: { [Op.gt]: new Date() }, // startTime > now
        },
        {
          clientId: curUser.id, // clientId = curUser.id
        },
      ],
    };
  }

  return filter;
};

exports.getFilterReadSession = (req) => {
  const curUser = req.user || { id: 0, name: "", role: "", iat: 0, exp: 0 };

  let filter = { id: req.params.id };
  if (curUser.role === "therapist") {
    filter = {
      ...filter,
      therapistId: curUser.id,
    };
  } else if (curUser.role === "client") {
    // where (clientId is null and startTime is greater than now) OR clientId is curUser.id
    filter = {
      ...filter,
      [Op.or]: [
        {
          clientId: null,
          startTime: { [Op.gt]: new Date() }, // startTime > now
        },
        {
          clientId: curUser.id, // clientId = curUser.id
        },
      ],
    };
  }

  return filter;
};

exports.getFilterUpdateSession = (req) => {
  const curUser = req.user || { id: 0, name: "", role: "", iat: 0, exp: 0 };

  let filter = { id: req.params.id };
  if (curUser.role === "therapist") {
    filter = {
      ...filter,
      therapistId: curUser.id,
    };
  }

  return filter;
};

exports.getFilterDeleteSession = (req) => {
  const curUser = req.user || { id: 0, name: "", role: "", iat: 0, exp: 0 };

  let filter = { id: req.params.id };
  if (curUser.role === "therapist") {
    filter = {
      ...filter,
      therapistId: curUser.id,
      status: "available",
    };
  }

  return filter;
};
