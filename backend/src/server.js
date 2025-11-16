require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const { createRedisClient } = require("./config/redis");
const config = require("./config/config");

(async () => {
    await connectDB();
    await createRedisClient();
    app.listen(config.port, () => console.log(`Server running on port ${config.port}`));
})();
