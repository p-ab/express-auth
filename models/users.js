const DB = require('../config/database');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(DB.name, DB.user, DB.pass, DB.options);

const User = sequelize.define('user', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  createdAt: {type: Sequelize.DATE, field: 'created_at'},
  updatedAt: {type: Sequelize.DATE, field: 'updated_at'},
  deleteAt: {type: Sequelize.DATE, field: 'deleted_at'},
  name: {type: Sequelize.STRING},
  pass: {type: Sequelize.STRING, fiels: 'hash_pass'}
})

module.exports = User;