const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    recoveryToken: { type: String, default: null },
    recoveryExpires: { type: Date, default: null },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
