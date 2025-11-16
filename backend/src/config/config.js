module.exports = {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGO_URI, // must be defined
    redisUrl: process.env.REDIS_URL || "redis://127.0.0.1:6379",
    apiKeyExpiry: 1000 * 60 * 60 * 24 * 30, // 30 days
};
