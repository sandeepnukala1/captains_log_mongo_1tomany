require('dotenv').config()

const mongoose = require('mongoose')

const { log } = require('mercedlogger')

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/defaultdb"

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}

mongoose.connect(MONGODB_URI, config)

mongoose.connection
  // Event for When Connection Opens
  .on("open", () => log.green("STATUS", "Connected to Mongo"))
  // Event for When Connection Closes
  .on("close", () => log.red("STATUS", "Disconnected from Mongo"))
  // Event for Connection Errors
  .on("error", error => log.red("ERROR", error))


module.exports = mongoose