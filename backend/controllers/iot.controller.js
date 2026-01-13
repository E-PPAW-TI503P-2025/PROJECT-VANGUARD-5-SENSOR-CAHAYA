const { SensorLog } = require("../models");
console.log("🔥 IOT CONTROLLER AKTIF & DIPAKAI");

exports.createSensorLog = async (req, res) => {
  const { cahaya } = req.body;

  const AMBANG = 2000;

  const kondisi = cahaya > AMBANG ? "TERANG" : "GELAP";
  const status_lampu = cahaya > AMBANG ? "OFF" : "ON";

  const data = await SensorLog.create({
    cahaya,
    kondisi,
    status_lampu
  });

  res.status(201).json({ data });
};

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
