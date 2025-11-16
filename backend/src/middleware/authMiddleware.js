const ApiKey = require("../models/ApiKey");

const authenticateApiKey = async (req, res, next) => {
    try {
        const apiKey = req.header("x-api-key");
        if (!apiKey) return res.status(401).json({ message: "API key missing" });

        const keyRecord = await ApiKey.findOne({ key: apiKey, active: true });
        if (!keyRecord) return res.status(401).json({ message: "Invalid API key" });

        if (keyRecord.expiresAt && keyRecord.expiresAt < Date.now())
            return res.status(401).json({ message: "API key expired" });

        req.appKey = keyRecord;
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = authenticateApiKey;
