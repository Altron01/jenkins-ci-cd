require('dotenv').config();

const APP_PORT          = process.env.APP_PORT
const REDIS_URL         = process.env.REDIS_URL

module.exports = { APP_PORT, REDIS_URL }