module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("user", {
      name: {
        type: DataTypes.STRING,
        validate: {
          len: [01]
        }
      }
    });
    return User;
  };
  