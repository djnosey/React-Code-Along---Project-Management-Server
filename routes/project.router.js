//      routes/project-routes.js
const express = require("express");
const router = express.Router();

const Project = require("./../models/project.model");
const Task = require("./../models/task.model");

// POST '/api/projects'    => to post a new projects
router.post("/projects", (req, res, next) => {
  const { title, description } = req.body;

  Project.create({ title, description, tasks: [] })

    .then((createdProject) => {
      res.status(201).json(createdProject);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
// GET '/api/projects'		 => to get all the projects
router.get("/projects", (req, res, next) => {
  Project.find()
    .populate("tasks")
    .then((projectObjs) => {
      res.status(200).json(projectObjs);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
// GET '/api/projects/:id'		 => to get a specific projects

router.get("/projects/:id", (req, res, next) => {
  const { id } = req.params;
  Project.findById(id)
    .populate("tasks")
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
// PUT '/api/projects/:id' 		=> to update a specific project
router.put("/projects/:id", (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  Project.findByIdAndUpdate(id, { title, description })
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
// DELETE '/api/projects/:id'   => to delete a specific project
router.delete("/projects/:id", (req, res, next) => {
  const { id } = req.params;

  Project.findByIdAndDelete(id)
    .then(() => {
      res.status(202).send();
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
module.exports = router;
