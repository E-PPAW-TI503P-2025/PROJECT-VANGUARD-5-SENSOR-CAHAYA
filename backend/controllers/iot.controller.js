const { SensorLog } = require("../models");
console.log("🔥 IOT CONTROLLER AKTIF & DIPAKAI");

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
    const data = await SensorLog.findAll({
      order: [["createdAt", "DESC"]]
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data" });
  }
};

exports.getLatestSensorLog = async (req, res) => {
  try {
    const data = await SensorLog.findOne({
      order: [["createdAt", "DESC"]]
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data terbaru" });
  }
};
