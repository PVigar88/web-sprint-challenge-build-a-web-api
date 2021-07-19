// Write your "actions" router here!
const express = require("express");

const Actions = require("../actions/actions-model.js");
const { validateActionId } = require("../actions/actions-middlware.js");

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

router.put("/:id", validateActionId, (req, res) => {
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
    const id = req.params.id;
    Actions.update(id, req.body)
      .then(async (updatedAction) => {
        if (updatedAction) {
          res.status(200).json(await Actions.get(id));
        } else {
          res.status(404).json({ message: "action Id not found" });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "A Server Error has occured (Error Code: actrtr-pt)",
        });
      });
  }
});
router.delete("/:id", (req, res) => {
  Actions.remove(req.params.id)
    .then((count) => {
      if (!count) {
        res.status(404).json({
          message: "The action with the specified ID does not exist",
        });
      } else {
        res.status(200).json();
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "A Server Error has occured (Error Code: actrtr-dlt)",
      });
    });
});

module.exports = router;
