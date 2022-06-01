const Sequelize = require('sequelize')
const CategoryModel = require('./category')
require('dotenv').config()

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER_NAME, process.env.PASSWORD, {
    host : process.env.HOST,
    dialect: 'postgres',
    port: process.env.PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true, // This will help you. But you will see nwe error
        rejectUnauthorized: false // This line will fix new error
      }
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