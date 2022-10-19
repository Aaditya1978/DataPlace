'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  contact.init({
    college_id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    query: DataTypes.STRING,
    response: DataTypes.STRING,
    status: DataTypes.STRING,
    admin_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    response_date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'contact',
  });

  contact.associate = function(models) {
    contact.hasOne(models.college, {
      foreignKey: 'id',
      sourceKey: 'college_id'
    });

    contact.hasOne(models.admin, {
      foreignKey: 'id',
      sourceKey: 'admin_id'
    });
  };

  return contact;
};