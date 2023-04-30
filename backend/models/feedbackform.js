'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class feedbackForm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  feedbackForm.init({
    collegeID: DataTypes.INTEGER,
    collegeName: DataTypes.STRING,
    year: DataTypes.INTEGER,
    link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'feedbackForm',
  });

  feedbackForm.associate = function(models) {
    feedbackForm.hasMany(models.feedback, {
      foreignKey: 'formId',
      sourceKey: 'id'
    });
  };

  return feedbackForm;
};