module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      nome: 'João Mesquita',
      email: 'joao.mesquita@ancar.com.br',
      cpf: '54364866067',
      password: '$2b$10$EfVjC0zE2TE9ZE1b4lcBQelnMic4kM2L2MSWAPKfD1Z8LyRjzK8Mq', //12345678
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};