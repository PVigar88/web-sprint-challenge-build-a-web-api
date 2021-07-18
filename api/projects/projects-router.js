// Write your "projects" router here!
const express = require("express");

const Projects = require("../projects/projects-model.js");

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

router.get("/:id", (req, res) => {
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

router.put("/:id", (req, res) => {
  if (!req.body.name || !req.body.description || !req.body.completed) {
    res.status(400).json({
      message: "Project must have name, decription and completed status",
    });
  } else {
    const changes = req.body;
    const id = req.params.id;
    Projects.update(id, changes)
      .then((updatedProject) => {
        if (updatedProject) {
          return Projects.get(req.params.id);
        } else {
          res.status(404).json({ message: "project Id not found" });
        }
      })
      .then((updatedProject) => {
        res.status(200).json(updatedProject);
      })
      .catch((err) => {
        res.status(500).json({
          message: "A Server Error has occured (Error Code: pjtrtr-pt)",
        });
      });
  }
});
router.delete("/:id", (req, res) => {
  Projects.get(req.params.id).then((project) => {
    if (project) {
      Projects.remove(id)
        .then((count) => {
          if (count) {
            res.status(200).end();
          } else {
            res.status(404).json({
              message: "The project with the specified ID does not exist",
            });
          }
        })
        .catch((err) => {
          res.status(500).json({
            message: "A Server Error has occured (Error Code: pjtrtr-dlt)",
          });
        });
    } else {
      res
        .status(404)
        .json({ message: "There is no project witht he given id" });
    }
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
