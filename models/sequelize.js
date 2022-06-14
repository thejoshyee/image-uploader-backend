const Sequelize = require('sequelize')
const CategoryModel = require('./category')
require('dotenv').config()

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER_NAME, process.env.PASSWORD, {
    host : process.env.HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    protocol: 'postgres',
    dialectOptions: {
        ssl: true
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


sequelize.sync() 
  .then(() => {
    console.log(`Database & tables created!`)
});

module.exports = {
    Category
}