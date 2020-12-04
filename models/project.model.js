//      models/project.model.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectsSchema = new Schema({
  title: String,
  description: String,
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

const Project = mongoose.model("Project", projectsSchema);

module.exports = Project;
