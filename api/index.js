const express = require('express')
const router = express.Router()

require('./routes/queries')(router)

module.exports = router