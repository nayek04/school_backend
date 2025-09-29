const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  grade: { type: String, required: true }
});

// Use existing model if compiled; otherwise, create it
const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

module.exports = Student;
