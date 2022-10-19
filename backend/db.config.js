module.exports = {
    HOST: "localhost",
    USER: "dataplace",
    PASSWORD: "12345",
    DB: "dataplace",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};