const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }, // 👈 matches your tests
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Announcement', announcementSchema);
