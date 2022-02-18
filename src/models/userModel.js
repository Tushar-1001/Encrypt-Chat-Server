const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },

    contacts: { type: [String], trim: true, required: true },

    phone: { type: String, trim: true, required: true , unique : true },

    secretKey : { type: String, trim: true, required: true  }
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
