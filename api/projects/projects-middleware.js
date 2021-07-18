// add middlewares here related to projects
const Project = require("../projects/projects-model");

async function validateProjectId(req, res, next) {
  try {
    const project = await Project.get(req.params.id);
    if (project) {
      next();
    } else {
      res.status(404).json({ message: "project not found" });
    }
  } catch {
    res.status(500).json({ message: "There is an error with the server" });
  }
}
function validateProject(req, res, next) {
  const { name, description, completed } = req.body;

  if (name && description && completed) {
    req.name = name;
    req.description = description;
    next();
  } else {
    res
      .status(400)
      .json({ message: "missing required name or description field" });
  }
}

module.exports = {
  validateProjectId,
  validateProject,
};
