'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('feedbacks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      formId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'feedbackForms',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING
      },
      rollNumber: {
        type: Sequelize.STRING
      },
      branch: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      alreadyPlaced: {
        type: Sequelize.BOOLEAN
      },
      companyName: {
        type: Sequelize.STRING
      },
      overallExperience: {
        type: Sequelize.STRING
      },
      feedback: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('feedbacks');
  }
};