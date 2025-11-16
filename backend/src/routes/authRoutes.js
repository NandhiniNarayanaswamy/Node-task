const express = require("express");
const router = express.Router();
const { registerApp, getApiKey, revokeApiKey } = require("../controllers/authController");
const validate = require("../middleware/validate");
const Joi = require("joi");

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required()
});

const revokeSchema = Joi.object({
    apiKey: Joi.string().required()
});

router.post("/register", validate(registerSchema), registerApp);
router.get("/api-key", getApiKey);
router.post("/revoke", validate(revokeSchema), revokeApiKey);

module.exports = router;
