const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create a connection to the database
const sequelize = new Sequelize(
  process.env.DB_NAME || 'todo_db',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'postgres', // Default to 'postgres' for Docker service name
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    retry: {
      max: 5, // Maximum retry attempts
      match: [
        /SequelizeConnectionError/,
        /SequelizeConnectionRefusedError/,
        /SequelizeHostNotFoundError/,
        /SequelizeHostNotReachableError/,
        /SequelizeInvalidConnectionError/,
        /SequelizeConnectionTimedOutError/
      ],
      backoffBase: 1000, // Initial backoff duration in ms
      backoffExponent: 1.5 // Exponential backoff factor
    }
  }
);

// Test the connection
const testConnection = async () => {
  // Add retry logic for initial connection
  let retries = 5;
  while (retries) {
    try {
      await sequelize.authenticate();
      console.log('Database connection established successfully.');
      break;
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      retries -= 1;
      console.log(`Retries left: ${retries}`);
      // Wait for 5 seconds before retrying
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

testConnection();

module.exports = sequelize;