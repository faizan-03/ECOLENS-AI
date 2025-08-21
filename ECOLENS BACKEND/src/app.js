const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const config = require('./config');

const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');

const dataRoutes = require('./routes/data');
const cvRoutes = require('./routes/cv');
const simulationRoutes = require('./routes/simulation');
const narrativeRoutes = require('./routes/narrative');
const visualizationRoutes = require('./routes/visualization');

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(compression());

if (config.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/data', dataRoutes);
app.use('/api/cv', cvRoutes);
app.use('/api/simulation', simulationRoutes);
app.use('/api/narrative', narrativeRoutes);
app.use('/api/visualization', visualizationRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;