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
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      res.status(500).json({
        message: "A Server Error has occured (Error Code: pjtrtr-gtid)",
      });
    });
});

router.post("/", (req, res) => {
  Projects.insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((err) => {
      res.status(500).json({
        message: "A Server Error has occured (Error Code: pjtrtr-pst)",
      });
    });
});

router.put("/:id", (req, res) => {
  Projects.update(id, changes)
    .then((updatedAction) => {})
    .catch((err) => {
      res.status(500).json({
        message: "A Server Error has occured (Error Code: pjtrtr-pt)",
      });
    });
});
router.delete("/:id", (req, res) => {
  Projects.remove(id)
    .then((count) => {})
    .catch((err) => {
      res.status(500).json({
        message: "A Server Error has occured (Error Code: pjtrtr-dlt)",
      });
    });
});
module.exports = router;
