const { nanoid } = require("nanoid");

const generateApiKey = () => nanoid(32);

module.exports = generateApiKey;
