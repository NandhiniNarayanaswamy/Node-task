const mongoose = require("mongoose");

const analyticsEventSchema = new mongoose.Schema({
    appId: { type: mongoose.Schema.Types.ObjectId, ref: "ApiKey" },
    event: { type: String, required: true },
    url: { type: String },
    referrer: { type: String },
    device: { type: String },
    ipAddress: { type: String },
    metadata: { type: Object },
    timestamp: { type: Date, default: Date.now },
});

analyticsEventSchema.index({ event: 1, timestamp: 1 });
analyticsEventSchema.index({ appId: 1 });

module.exports = mongoose.model("AnalyticsEvent", analyticsEventSchema);
