// Write your "actions" router here!
const express = require("express");

const Actions = require("../actions/actions-model.js");

const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      res.status(500).json({
        message: "A Server Error has occured (Error Code: actrtr-gt)",
      });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Actions.get(id)
    .then((action) => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({ message: "no project with given id" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "A Server Error has occured (Error Code: actrtr-gtid)",
      });
    });
});

router.post("/", (req, res) => {
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    res
      .status(400)
      .json({ message: "The project must have a name and description" });
  } else {
    Actions.insert(req.body)
      .then((action) => {
        res.status(201).json(action);
      })
      .catch((err) => {
        res.status(500).json({
          message: "A Server Error has occured (Error Code: actrtr-pst)",
        });
      });
  }
});

router.put("/:id", (req, res) => {
  if (
    !req.body.notes ||
    !req.body.description ||
    !req.body.completed ||
    !req.body.project_id
  ) {
    res.status(400).json({
      message: "Project must have name, decription and completed status",
    });
  } else {
    Actions.update(id, changes)
      .then((updatedAction) => {
        if (updatedAction) {
          return Actions.get(req.params.id);
        } else {
          res.status(404).json({ message: "action Id not found" });
        }
      })
      .then(() => {
        res.status(200).json(updatedAction);
      })
      .catch((err) => {
        res.status(500).json({
          message: "A Server Error has occured (Error Code: actrtr-pt)",
        });
      });
  }
});
router.delete("/:id", (req, res) => {
  Actions.remove(id)
    .then((count) => {})
    .catch((err) => {
      res.status(500).json({
        message: "A Server Error has occured (Error Code: actrtr-dlt)",
      });
    });
});

module.exports = router;
