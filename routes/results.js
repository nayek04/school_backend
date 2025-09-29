const express = require('express');
const router = express.Router();
const Result = require('../models/Result');

// ✅ Create a new result
router.post('/', async (req, res, next) => {
  try {
    const result = new Result(req.body);
    await result.save();
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

// ✅ Get all results
router.get('/', async (req, res, next) => {
  try {
    const results = await Result.find().populate('studentId');
    res.json(results);
  } catch (error) {
    next(error);
  }
});

// ✅ Update result by ID
router.put('/:id', async (req, res, next) => {
  try {
    const updatedResult = await Result.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedResult) {
      return res.status(404).json({ message: 'Result not found' });
    }
    res.json(updatedResult);
  } catch (error) {
    next(error);
  }
});

// ✅ Delete result by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Result.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Result not found' });
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
