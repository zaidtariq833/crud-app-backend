const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
require("dotenv").config();
const db = {};

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER_NAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true,
        // ca: fs.readFileSync(process.env.CA)
      },
    },
  },
);

sequelize.addHook("beforeDefine", (attributes, options) => {
  options.timestamps = options.timestamps ?? true;
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.sequelize.sync({ force: false });

module.exports = db;
