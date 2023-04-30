'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  feedback.init({
    formId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    rollNumber: DataTypes.STRING,
    branch: DataTypes.STRING,
    email: DataTypes.STRING,
    alreadyPlaced: DataTypes.BOOLEAN,
    companyName: DataTypes.STRING,
    overallExperience: DataTypes.STRING,
    feedback: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'feedback',
  });

  feedback.associate = function(models) {
    feedback.belongsTo(models.feedbackForm, {
      foreignKey: 'formId',
      targetKey: 'id'
    });
  };

  return feedback;
};