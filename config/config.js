require("dotenv").config();

module.exports = {
  development: {
    database: process.env.DATABASE,
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: 3307,
    dialect: process.env.DIALECT,
  },
  test: {
    database: process.env.DATABASE,
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: process.env.DIALECT,
  },
  production: {
    database: process.env.DATABASE,
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DIALECT,
  },
};
