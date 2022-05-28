module.exports = (sequelize, DataTypes) => {
    return sequelize.define('upload', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        poster: DataTypes.STRING,
      },
      {
        freezeTableName: true 
      }
    )
}