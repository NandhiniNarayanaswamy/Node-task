const Redis = require("ioredis");
const config = require("./config");

let redisClient;

const createRedisClient = async () => {
    redisClient = new Redis(config.redisUrl);
    redisClient.on("connect", () => console.log("Redis connected"));
    redisClient.on("error", (err) => console.error("Redis error:", err));
};

module.exports = { createRedisClient, redisClient: () => redisClient };
