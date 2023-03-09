'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('placements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      college_id: {
        type: Sequelize.INTEGER,
        refrences: {
          model: 'colleges',
          key: 'id'
        }
      },
      year: {
        type: Sequelize.INTEGER
      },
      branch: {
        type: Sequelize.STRING
      },
      total_students: {
        type: Sequelize.INTEGER
      },
      eligible_students: {
        type: Sequelize.INTEGER
      },
      pnr_students: {
        type: Sequelize.INTEGER
      },
      placed_students: {
        type: Sequelize.INTEGER
      },
      offer_letters: {
        type: Sequelize.INTEGER
      },
      lowest_package: {
        type: Sequelize.DOUBLE
      },
      highest_package: {
        type: Sequelize.DOUBLE
      },
      average_package: {
        type: Sequelize.DOUBLE
      },
      number_of_companies: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('placements');
  }
};