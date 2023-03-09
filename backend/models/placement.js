'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class placement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  placement.init({
    college_id: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    branch: DataTypes.STRING,
    total_students: DataTypes.INTEGER,
    eligible_students: DataTypes.INTEGER,
    pnr_students: DataTypes.INTEGER,
    placed_students: DataTypes.INTEGER,
    offer_letters: DataTypes.INTEGER,
    lowest_package: DataTypes.DOUBLE,
    highest_package: DataTypes.DOUBLE,
    average_package: DataTypes.DOUBLE,
    number_of_companies: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'placement',
  });

  placement.associate = function(models) {
    placement.hasOne(models.college, {
      foreignKey: 'id',
      sourceKey: 'college_id'
    });
  };

  return placement;
};