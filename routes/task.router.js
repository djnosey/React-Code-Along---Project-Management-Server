//      routes/task-routes.js
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Project = require("../models/project.model");
const Task = require("../models/task.model");

// GET '/api/projects/:projectId/tasks/:taskId'   => to retrieve a specific task
router.get("/tasks/:id", (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Task.findById(id)
    .then((foundTask) => {
      res.status(200).json(foundTask);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
// POST '/api/tasks'      => to create a new task
router.post("/tasks", (req, res) => {
  const { title, description, project } = req.body;
  console.log(project);
  Task.create({
    title,
    description,
    project,
  })
    .then((task) => {
      console.log("task", task);
      Project.findByIdAndUpdate(project, { $push: { tasks: task._id } })
        .then((returnedProject) => {
          res.status(201).json(returnedProject);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
// PUT '/api/tasks/:id'    => to update a specific task
router.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Task.findByIdAndUpdate(id, { title, description })
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Task.findByIdAndRemove(id)
    .then(() => {
      res.status(202).send(`Document ${id} was removed successfully.`);
    })
    .catch((err) => {
      res.json(err);
    });
});
module.exports = router;
