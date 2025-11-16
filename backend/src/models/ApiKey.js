const mongoose = require("mongoose");

const apiKeySchema = new mongoose.Schema({
    key: { type: String, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    active: { type: Boolean, default: true },
    expiresAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ApiKey", apiKeySchema);
