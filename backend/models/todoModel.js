const { DataTypes } = require('sequelize');//needed in order to connect to postgres
const sequelize = require('../config/db');

const Todo = sequelize.define('Todo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  userId:{
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
}, {
  tableName: 'todos',
  timestamps: false
});

// Sync the model with the database
// In production, you would use migrations instead
(async () => {
  try {
    await Todo.sync();
    console.log('Todo model synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing Todo model:', error);
  }
})();
Todo.associate = (models) => {
  Todo.belongsTo(models.Users, { foreignKey: 'userId' });
};
module.exports = Todo;