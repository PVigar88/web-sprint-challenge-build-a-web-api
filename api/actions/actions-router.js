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
      res
        .status(500)
        .json({
          message: "A Server Error has occured (Error Code: pv-actrtr-gt)",
        });
    });
});
