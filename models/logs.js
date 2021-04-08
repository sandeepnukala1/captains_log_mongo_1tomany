const { Schema, model } = require('../db/connection')

const LogSchema = new Schema({
    title: String,
    entry: String,
    shipIsBroken: {type: Boolean, default: true}
}, { timestamps: true })

const Log = model("Log", LogSchema)

module.exports = Log