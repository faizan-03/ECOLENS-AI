const app = require('./app');
const connectDB = require('./config/database');
const config = require('./config');
const { seedCO2Data } = require('./utils/seedData');

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

const startServer = async () => {
  await connectDB();
  
  if (config.NODE_ENV === 'development') {
    await seedCO2Data();
  }

  const server = app.listen(config.PORT, () => {
    console.log(`🌍 ECOLENS Backend Server Started`);
    console.log(`🚀 Server running on port ${config.PORT}`);
    console.log(`📊 Health check: http://localhost:${config.PORT}/health`);
  });

  process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
    server.close(() => {
      process.exit(1);
    });
  });

  process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
      console.log('Process terminated');
    });
  });
};

startServer();