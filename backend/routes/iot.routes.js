const express = require("express");
const router = express.Router();

const iotController = require("../controllers/iot.controller");

router.post("/sensor", iotController.createSensorLog);
router.get("/sensor", iotController.getAllSensorLogs);
router.get("/sensor/latest", iotController.getLatestSensorLog);

module.exports = router;
