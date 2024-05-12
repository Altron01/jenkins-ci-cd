require('dotenv').config();

const APP_PORT            = process.env.APP_PORT
const SESSION_MS_ENDPOINT = process.env.SESSION_MS_ENDPOINT
const AUTH_DB_HOST        = process.env.AUTH_DB_HOST
const AUTH_DB_USER        = process.env.AUTH_DB_USER
const AUTH_DB_PASSWORD    = process.env.AUTH_DB_PASSWORD
const AUTH_DB_DB_NAME     = process.env.AUTH_DB_DB_NAME

module.exports = { APP_PORT, SESSION_MS_ENDPOINT, AUTH_DB_HOST, AUTH_DB_USER, AUTH_DB_PASSWORD, AUTH_DB_DB_NAME }