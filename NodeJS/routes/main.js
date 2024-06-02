const path = require('path')
const express = require('express');

const mainController = require('../controller/main.js')

const router = express.Router()

router.get('/',mainController.getDashboard)

module.exports = router