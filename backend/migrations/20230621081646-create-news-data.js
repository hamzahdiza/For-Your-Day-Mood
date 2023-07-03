"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("News", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.TEXT,
      },
      author: {
        type: Sequelize.STRING,
      },
      published_date: {
        type: Sequelize.STRING,
      },
      published_date_precision: {
        type: Sequelize.STRING,
      },
      link: {
        type: Sequelize.STRING,
      },
      clean_url: {
        type: Sequelize.STRING,
      },
      excerpt: {
        type: Sequelize.TEXT,
      },
      summary: {
        type: Sequelize.TEXT,
      },
      rights: {
        type: Sequelize.STRING,
      },
      rank: {
        type: Sequelize.STRING,
      },
      topic: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      language: {
        type: Sequelize.STRING,
      },
      authors: {
        type: Sequelize.STRING,
      },
      media: {
        type: Sequelize.TEXT,
      },
      is_opinion: {
        type: Sequelize.BOOLEAN,
      },
      twitter_account: {
        type: Sequelize.STRING,
      },
      _score: {
        type: Sequelize.INTEGER,
      },
      aaa: {
        type: Sequelize.STRING,
      },
      aa_ida: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("News");
  },
};
