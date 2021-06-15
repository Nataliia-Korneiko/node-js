const { Sequelize, DataTypes } = require('sequelize');

// Option 1: Passing a connection URI
const sequelize = new Sequelize('sqlite:./data/cats.db');

// создание таблицы cats
sequelize.define('cat', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  isVaccinated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

sequelize.sync();

module.exports = {
  db: sequelize,
  connect: sequelize.authenticate(),
};
