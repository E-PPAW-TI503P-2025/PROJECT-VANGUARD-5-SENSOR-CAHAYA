const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const SensorLog = sequelize.define("SensorLog", {
  idSensorLogs: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cahaya: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "SensorLogs",
  timestamps: true
});

module.exports = SensorLog;
