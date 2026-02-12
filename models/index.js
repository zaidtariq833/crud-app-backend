require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const basename = path.basename(__filename);

let sequelize;
const db = {};

function getSequelize() {
  if (sequelize) return sequelize;

  sequelize = new Sequelize(process.env.CONNECTION_STRING, {
    dialect: "mysql",
    logging: false,
  });

  return sequelize;
}

// Initialize once per cold start
if (!db.sequelize) {
  const sequelizeInstance = getSequelize();

  fs.readdirSync(__dirname)
    .filter(
      (file) =>
        file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-3) === ".js",
    )
    .forEach((file) => {
      const model = require(path.join(__dirname, file))(
        sequelizeInstance,
        Sequelize.DataTypes,
      );
      db[model.name] = model;
    });

  // Run associations
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelizeInstance;
  db.Sequelize = Sequelize;
}

module.exports = db;
