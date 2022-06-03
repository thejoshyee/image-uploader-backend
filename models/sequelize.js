const Sequelize = require('sequelize')
const CategoryModel = require('./category')
require('dotenv').config()

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER_NAME, process.env.PASSWORD, {
    host : process.env.HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    dialectOptions: {
      ssl: {
        require: true, // This will help you. But you will see nwe error
        rejectUnauthorized: false // This line will fix new error
      }
    },
    pool: {
      max: 15,
      min: 5,
      idle: 20000,
      evict: 15000,
      acquire: 30000
    },
  })



const Category = CategoryModel(sequelize, Sequelize);


sequelize.sync({ force: true }) 
  .then(() => {
    console.log(`Database & tables created!`)
});

module.exports = {
    Category
}