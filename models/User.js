import bcrypt from 'bcrypt'
module.exports = (sequelize, DataType) =>{
  const User = sequelize.define('User', {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    email: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },

    avatarUrl: {
      type: DataType.STRING,
      defaultValue: '/test_avatar.jpg',
    },

    password: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    underscored: true,
    hooks: {
      beforeCreate: (user) => {
        console.log('inside beforeCreate hook');

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
    classMethods: {
      associate(models) {
        User.hasMany(models.Task);
      },

      isPassword(encodedPassword, passwordParam) {
        return bcrypt.compareSync(passwordParam, encodedPassword);
      }
    }
  });

  return User;
}
