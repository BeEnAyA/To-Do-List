module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {
      displayname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gmail: {
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
      otp:{
        type:DataTypes.INTEGER,
        allowNull:true,
      },
      is_oauth_user:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
      }
    });
    return User;
  };