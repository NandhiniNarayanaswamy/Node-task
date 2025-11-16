const User = require("../models/User");
const ApiKey = require("../models/ApiKey");
const generateApiKey = require("../utils/generateApiKey");
const config = require("../config/config");

exports.registerApp = async (req, res, next) => {
    try {
        const { name, email } = req.body;

        let user = await User.findOne({ email });
        if (!user) user = await User.create({ name, email });

        const key = generateApiKey();
        const apiKey = await ApiKey.create({
            key,
            user: user._id,
            expiresAt: Date.now() + config.apiKeyExpiry,
        });

        res.json({ apiKey: apiKey.key });
    } catch (err) {
        next(err);
    }
};

exports.getApiKey = async (req, res, next) => {
    try {
        const { email } = req.query;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const keyRecord = await ApiKey.findOne({ user: user._id, active: true });
        res.json({ apiKey: keyRecord?.key });
    } catch (err) {
        next(err);
    }
};

exports.revokeApiKey = async (req, res, next) => {
    try {
        const { apiKey } = req.body;
        const keyRecord = await ApiKey.findOne({ key: apiKey });
        if (!keyRecord) return res.status(404).json({ message: "API key not found" });

        keyRecord.active = false;
        await keyRecord.save();
        res.json({ message: "API key revoked" });
    } catch (err) {
        next(err);
    }
};
