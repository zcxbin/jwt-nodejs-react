'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'User',
      [
        {
          email: 'Hungnguyen1',
          password: '123456',
          username: 'fake1'
        },
        {
          email: 'Hungnguyen2',
          password: '123456',
          username: 'fake2'
        },
        {
          email: 'Hungnguyen3',
          password: '123456',
          username: 'fake3'
        }
      ],
      {}
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
}
