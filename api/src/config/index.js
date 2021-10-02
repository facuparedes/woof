require("dotenv").config();

module.exports = {
  HOST: process.env.HOST || "127.0.0.1",
  PORT: process.env.PORT || 3001,
  DB_USER: process.env.DB_USER || "username",
  DB_PASSWORD: process.env.DB_PASSWORD || "password",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_DATABASE: process.env.DB_DATABASE || "databasename",
  API_URL: process.env.API_URL || "http://localhost:3000",
  API_KEY: process.env.API_KEY || "8403247023847230847230",
};
