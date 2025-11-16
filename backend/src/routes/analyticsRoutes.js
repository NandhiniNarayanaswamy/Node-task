const express = require("express");
const router = express.Router();
const { collectEvent, eventSummary, userStats } = require("../controllers/analyticsController");
const authenticateApiKey = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const Joi = require("joi");

const eventSchema = Joi.object({
    event: Joi.string().required(),
    url: Joi.string().uri().optional(),
    referrer: Joi.string().uri().optional(),
    device: Joi.string().valid("desktop", "mobile", "tablet").optional(),
    ipAddress: Joi.string().ip().optional(),
    timestamp: Joi.date().optional(),
    metadata: Joi.object().optional()
});

router.post("/collect", authenticateApiKey, validate(eventSchema), collectEvent);
router.get("/event-summary", authenticateApiKey, eventSummary);
router.get("/user-stats", authenticateApiKey, userStats);

module.exports = router;
