const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const limiter = require("./middleware/rateLimiter");
const errorHandler = require("./middleware/errorHandler");

const authRoutes = require("./routes/authRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(limiter);

app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);

app.use(errorHandler);

module.exports = app;
