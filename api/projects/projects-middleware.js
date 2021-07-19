// add middlewares here related to projects
const Project = require("../projects/projects-model");

async function validateProjectId(req, res, next) {
  try {
    const project = await Project.get(req.params.id);
    if (project) {
      req.project = project;
      next();
    } else {
      res.status(404).json({ message: "project not found" });
    }
  } catch {
    res.status(500).json({ message: "There is an error with the server" });
  }
}

module.exports = {
  validateProjectId,
};
