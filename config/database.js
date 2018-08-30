const DBdefaults = {
  name: process.env.dbname, 
  user: process.env.dbuser, 
  pass: process.env.dbpass, 
  options: {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    underscored: true,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};

module.exports = DBdefaults;