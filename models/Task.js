module.exports = (sequelize, DataType) => {
  const Task = sequelize.define('Task', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },

    status: {
      type: DataType.INTEGER,
      allowNull: false,
      validate: { notEmpty: true }
    }
  }, {
    underscored: true,

    classMethods: {
      associate(models) {
        Task.belongsTo(models.User);
      }
    }
  });

  return Task;
};
