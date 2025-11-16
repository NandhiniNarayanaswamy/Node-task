// src/config/redis.js
const Redis = require("ioredis");

// Use the REDIS_URL from environment variables
const REDIS_URL = process.env.REDIS_URL;

let redisClient;

const createRedisClient = () => {
    if (!REDIS_URL) {
        console.log("No REDIS_URL provided, skipping Redis connection.");
        return null;
    }

    redisClient = new Redis(REDIS_URL); // automatically handles rediss:// for TLS
    redisClient.on("connect", () => console.log("Redis connected"));
    redisClient.on("error", (err) => console.error("Redis error:", err));

    return redisClient;
};

// Function to get the client after initialization
const getRedisClient = () => {
    if (!redisClient) {
        throw new Error("Redis client not initialized. Call createRedisClient() first.");
    }
    return redisClient;
};

module.exports = { createRedisClient, getRedisClient };
