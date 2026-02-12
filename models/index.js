const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const basename = path.basename(__filename);

let sequelize;
const db = {};

function getSequelize() {
  if (sequelize) return sequelize;

  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 4000,
      dialect: process.env.DB_DIALECT || "mysql",
      logging: false,

      // 🔑 VERY IMPORTANT for Vercel + TiDB
      pool: {
        max: 1,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },

      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: true,
        },
      },
    },
  );

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
