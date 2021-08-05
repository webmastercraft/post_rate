'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Posts', [
      {
        article: 'I am a freelancer.',
        rate_count: 0,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        article: 'I am a client.',
        rate_count: 0,
        createdAt : new Date(),
        updatedAt : new Date()
      }
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     await queryInterface.bulkDelete('Posts', null, {});
  }
};
