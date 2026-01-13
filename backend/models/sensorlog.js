const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const SensorLog = sequelize.define(
  "SensorLog",
  {
    idSensorLogs: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cahaya: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    kondisi: {
      type: DataTypes.ENUM("TERANG", "GELAP"),
      allowNull: false
    },
    status_lampu: {
      type: DataTypes.ENUM("ON", "OFF"),
      allowNull: false
    }
  },
  {
    tableName: "sensorlogs",
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  }
);

module.exports = SensorLog;
