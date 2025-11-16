const AnalyticsEvent = require("../models/AnalyticsEvent");
const { redisClient } = require("../config/redis");

exports.collectEvent = async (req, res, next) => {
    try {
        const { event, url, referrer, device, ipAddress, timestamp, metadata } = req.body;

        const analyticsEvent = await AnalyticsEvent.create({
            appId: req.appKey._id,
            event,
            url,
            referrer,
            device,
            ipAddress,
            timestamp,
            metadata,
        });

        res.status(201).json({ message: "Event collected", analyticsEvent });
    } catch (err) {
        next(err);
    }
};

exports.eventSummary = async (req, res, next) => {
    try {
        const { event, startDate, endDate, app_id } = req.query;
        const cacheKey = `summary:${event}:${startDate}:${endDate}:${app_id}`;

        const cached = await redisClient().get(cacheKey);
        if (cached) return res.json(JSON.parse(cached));

        let filter = { event };
        if (app_id) filter.appId = app_id;
        if (startDate || endDate) filter.timestamp = {};
        if (startDate) filter.timestamp.$gte = new Date(startDate);
        if (endDate) filter.timestamp.$lte = new Date(endDate);

        const data = await AnalyticsEvent.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: "$device",
                    count: { $sum: 1 },
                    uniqueUsers: { $addToSet: "$ipAddress" },
                },
            },
        ]);

        const result = {
            event,
            count: data.reduce((acc, d) => acc + d.count, 0),
            uniqueUsers: data.reduce((acc, d) => acc + d.uniqueUsers.length, 0),
            deviceData: Object.fromEntries(data.map(d => [d._id, d.count])),
        };

        await redisClient().setex(cacheKey, 60, JSON.stringify(result));
        res.json(result);
    } catch (err) {
        next(err);
    }
};

exports.userStats = async (req, res, next) => {
    try {
        const { userId } = req.query;
        const events = await AnalyticsEvent.find({ ipAddress: userId });
        if (!events.length) return res.status(404).json({ message: "No events found" });

        const deviceDetails = events.map(e => e.metadata).reduce((acc, md) => acc || md, {});

        res.json({
            userId,
            totalEvents: events.length,
            deviceDetails,
            ipAddress: events[0].ipAddress,
        });
    } catch (err) {
        next(err);
    }
};
