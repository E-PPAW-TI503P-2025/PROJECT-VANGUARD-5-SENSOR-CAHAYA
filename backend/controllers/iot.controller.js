const SensorLogs = require("../models/sensorlog");

// POST /api/sensor
exports.createSensorLog = async (req, res) => {
  try {
    const { cahaya } = req.body;

    if (cahaya === undefined) {
      return res.status(400).json({ message: "Data cahaya wajib dikirim" });
    }

    const data = await SensorLogs.create({ cahaya });

    res.status(201).json({
      message: "Data cahaya berhasil disimpan",
      data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/sensor
exports.getAllSensorLogs = async (req, res) => {
  try {
    const data = await SensorLogs.findAll({
      order: [["createdAt", "DESC"]]
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data" });
  }
};

// GET /api/sensor/latest
exports.getLatestSensorLog = async (req, res) => {
  try {
    const data = await SensorLogs.findOne({
      order: [["createdAt", "DESC"]]
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data terbaru" });
  }
};
