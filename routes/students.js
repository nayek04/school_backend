const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const mongoose=require('mongoose');

const Student = require('../models/Student');  // Import the Student model from models folder

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new student
router.post('/', async (req, res) => {
  const student = new Student({
    name: req.body.name,
    age: req.body.age,
    grade: req.body.grade
  });

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ message: 'Not found' });
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const studentId = req.params.id;
    console.log('DELETE attempt for ID:', studentId);  // Debug log
    // Validate ID to prevent CastError
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      console.log('Invalid ID format:', studentId);
      return res.status(400).json({ message: 'Invalid student ID' });
    }
    // Delete the student
    const deletedStudent = await Student.findByIdAndDelete(studentId);
    if (!deletedStudent) {
      console.log('Student not found for ID:', studentId);
      return res.status(404).json({ message: 'Student not found' });
    }
    console.log('Successfully deleted student:', deletedStudent._id);
    res.status(204).send();  // 204 No Content
  } catch (error) {
    console.error('DELETE error:', error.message);  // Logs the exact issue
    res.status(500).json({ 
      message: 'Server error during deletion',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined 
    });
  }
});
// Export the router for use in main app.js
module.exports = router;
