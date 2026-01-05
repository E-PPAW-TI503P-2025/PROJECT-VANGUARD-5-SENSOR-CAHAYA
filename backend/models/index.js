const fs = require("fs");
const path = require("path");
const sequelize = require("../config/sequelize");

const basename = path.basename(__filename);
const db = {};

// Load semua model
fs.readdirSync(__dirname)
  .filter(file => file !== basename && file.endsWith(".js"))
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
  });

db.sequelize = sequelize;

module.exports = db;
