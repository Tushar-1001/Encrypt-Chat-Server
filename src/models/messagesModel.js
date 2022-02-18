const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: { type: String, trim: true, required: true },

    text: { type: String, trim: true, required: true },

    recipient: { type: String, trim: true, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("message", messageSchema);
