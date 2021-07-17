const express = require("express");
const server = express();
const helmet = require("helmet");

const projectsRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");

server.use(helmet());

server.use("/actions", actionsRouter);
server.use("/projects", projectsRouter);

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
