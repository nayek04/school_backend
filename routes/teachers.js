const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');

router.get('/', async (req, res) => {
  const teachers = await Teacher.find();
  res.json(teachers);
});

router.post('/', async (req, res) => {
  const teacher = new Teacher(req.body);
  await teacher.save();
  res.status(201).json(teacher);
});

router.get('/:id', async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);
  res.json(teacher);
});

router.put('/:id', async (req, res) => {
  const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTeacher);
});

router.delete('/:id', async (req, res) => {
  await Teacher.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
