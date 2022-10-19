'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class college extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  college.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    district: DataTypes.STRING,
    state: DataTypes.STRING,
    pincode: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'college',
  });

  college.associate = function(models) {
    college.hasMany(models.placement, {
      foreignKey: 'college_id',
      sourceKey: 'id'
    });

    college.hasMany(models.contact, {
      foreignKey: 'college_id',
      sourceKey: 'id'
    });
  };

  return college;
};