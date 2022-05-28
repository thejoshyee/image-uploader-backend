const Sequelize = require('sequelize')
const UploadModel = require('./upload')

const sequelize = new Sequelize('d4n0v0n2ppn8ib', 'nspcyzvmiztuhm', 'a9ff964a44accdd82292f5077f84e8388effc3ff6b4c6e19d9e232fccda38893', {
    host : 'ec2-52-3-2-245.compute-1.amazonaws.com',
    dialect: 'postgres',
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true, // This will help you. But you will see nwe error
        rejectUnauthorized: false // This line will fix new error
      }
    },
  })

const Upload = UploadModel(sequelize, Sequelize);


sequelize.sync({ force: true }) 
  .then(() => {
    console.log(`Database & tables created!`)
});

module.exports = {
    Upload
}