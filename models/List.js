const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
  name: String,
  description: String,
  priority: Number,
  date_created: Date,
  is_finished: Boolean,
});

const ListModel = mongoose.model("List", listSchema);

module.exports = ListModel;
