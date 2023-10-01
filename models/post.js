const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 1,
  },
  user: String,
  date: Date,
});

postSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Post", postSchema);
