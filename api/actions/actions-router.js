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
      res.status(200).json(action);
    })
    .catch((err) => {
      res.status(500).json({
        message: "A Server Error has occured (Error Code: actrtr-gtid)",
      });
    });
});

router.post("/", (req, res) => {
  Actions.insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((err) => {
      res.status(500).json({
        message: "A Server Error has occured (Error Code: actrtr-pst)",
      });
    });
});

router.put("/:id", (req, res) => {
  Actions.update(id, changes)
    .then((updatedAction) => {})
    .catch((err) => {
      res.status(500).json({
        message: "A Server Error has occured (Error Code: actrtr-pt)",
      });
    });
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
