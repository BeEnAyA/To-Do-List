module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("tasks", {
      task: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      due_date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status:{
        type:DataTypes.STRING,
        defaultValue:"Pending",
        allowNull:false,
      }
    });
    return Task;
  };