module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {
      googleId:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type:DataTypes.STRING,
        allowNull:true,
      },
    });
    return User;
  };