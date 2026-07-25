const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const employeeRoutes = require('./routes/employee.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

app.get('/health', (req, res) => res.status(200).json({ status: 'ok', uptime: process.uptime(), version: '1.0.1' }));

app.use('/api/employees', employeeRoutes);

app.use(errorHandler);

module.exports = app;
