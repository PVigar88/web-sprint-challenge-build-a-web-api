// add middlewares here related to actions
const Action = require("../actions/actions-model");

async function validateActionId(req, res, next) {
  try {
    const action = await Action.get(req.params.id);
    if (action) {
      next();
    } else {
      res.status(404).json({ message: "project not found" });
    }
  } catch {
    res.status(500).json({ message: "There is an error with the server" });
  }
}

module.exports = {
  validateActionId,
};
