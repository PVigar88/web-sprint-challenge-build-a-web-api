// Write your "projects" router here!
const express = require("express");

const Projects = require("../projects/projects-model.js");
const { validateProjectId } = require("../projects/projects-middleware");

const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      res.status(500).json({
        message: "A Server Error has occured (Error Code: pjtrtr-gt)",
      });
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  const { id } = req.params;
  Projects.get(id)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: "no project with given id" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "A Server Error has occured (Error Code: pjtrtr-gtid)",
      });
    });
});

router.post("/", (req, res) => {
  if (!req.body.name || !req.body.description) {
    res
      .status(400)
      .json({ message: "The project must have a name and description" });
  } else {
    Projects.insert(req.body)
      .then((action) => {
        res.status(201).json(action);
      })
      .catch((err) => {
        res.status(500).json({
          message: "A Server Error has occured (Error Code: pjtrtr-pst)",
        });
      });
  }
});

router.put("/:id", validateProjectId, (req, res) => {
  if (!req.body.name || !req.body.description || !req.body.completed) {
    res.status(400).json({
      message: "Project must have name, description and completed status",
    });
  } else {
    const id = req.params.id;
    Projects.update(id, req.body)
      .then(async (updatedProject) => {
        if (updatedProject) {
          res.status(200).json(await Projects.get(id));
        } else {
          res.status(404).json({ message: "project Id not found" });
        }
      })
      // .then((updatedProject) => {
      //   updatedProject);
      // })
      .catch((err) => {
        res.status(500).json({
          message: "A Server Error has occured (Error Code: pjtrtr-pt)",
        });
      });
  }
});
router.delete("/:id", (req, res) => {
  Projects.remove(req.params.id)
    .then((count) => {
      if (!count) {
        res.status(404).json({
          message: "The project with the specified ID does not exist",
        });
      } else {
        res.status(200).json();
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "A Server Error has occured (Error Code: pjtrtr-dlt)",
      });
    });
});

router.get("/:id/actions", (req, res) => {
  Projects.getProjectActions(req.params.id)
    .then((actions) => {
      if (actions) {
        res.status(200).json(actions);
      } else {
        res.status(404).json({ message: "no project with provided id" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "a server error has occured" });
    });
});

module.exports = router;
