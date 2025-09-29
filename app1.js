require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
const studentRoutes = require('./routes/students');
const teacherRoutes = require('./routes/teachers');
const resultRoutes = require('./routes/results');
const announcementRoutes = require('./routes/announcements');

app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/announcements', announcementRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Sample API route
app.get('/api/welcome', (req, res) => {
  res.json({ message: 'Welcome to the School Backend!' });
});

// Start server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

module.exports = app;
