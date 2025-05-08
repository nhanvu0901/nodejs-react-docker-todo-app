const {DataTypes} = require('sequelize');//needed in order to connect to postgres
const sequelize = require('../config/db');

const Users = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Please enter a valid email address"
      }
    }
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: true,
    validate: {
      isDate: true,
      isBefore: {
        args: new Date().toISOString(),
        msg: "Birthdate cannot be in the future"
      },
      isAfter: {
        args: "1900-01-01",
        msg: "Birthdate is too far in the past"
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [8, 20],
        msg: "Password must be between 8 and 20 characters"
      },
      is: {
        args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        msg: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      }
    }
  }
  // Add other user fields as needed
}, {
  tableName: 'users'
})
// Sync the model with the database
// In production, you would use migrations instead
(async () => {
  try {
    await Users.sync();
    console.log('user model synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing user model:', error);
  }
})();
module.exports = Users;