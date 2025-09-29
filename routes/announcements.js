const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Announcement = require('../models/Announcement');

// Create announcement
router.post('/', async (req, res) => {
  try {
    const announcement = new Announcement(req.body);
    const saved = await announcement.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error creating announcement:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Get all announcements
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json(announcements);
  } catch (err) {
    console.error('Error fetching announcements:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Update announcement by ID
router.put('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid announcement ID' });
  }
  try {
    const updated = await Announcement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    res.status(200).json(updated);
  } catch (err) {
    console.error('Error updating announcement:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// Delete announcement by ID
router.delete('/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid announcement ID' });
  }
  try {
    const deleted = await Announcement.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Announcement not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting announcement:', err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
