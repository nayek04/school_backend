const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: String,
  email: String
});

module.exports = mongoose.model('Teacher', teacherSchema);
