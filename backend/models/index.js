const fs = require("fs");
const path = require("path");
const sequelize = require("../config/sequelize");

const db = {};

fs.readdirSync(__dirname)
  .filter(file => file !== "index.js" && file.endsWith(".js"))
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = sequelize.constructor;

module.exports = db;
