const Sequelize = require("sequelize");
const dbConfig = require("../db.config");
const college = require("./college.js");
const placement = require("./placement.js");
const admin = require("./admin.js");
const contact = require("./contact.js");
const feedback = require("./feedback.js");
const feedbackForm = require("./feedbackform.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.college = college(sequelize, Sequelize);
db.placement = placement(sequelize, Sequelize);
db.admin = admin(sequelize, Sequelize);
db.contact = contact(sequelize, Sequelize);
db.feedback = feedback(sequelize, Sequelize);
db.feedbackForm = feedbackForm(sequelize, Sequelize);

module.exports = db;
