const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  studentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student', 
    required: true 
  },
  subject: { type: String, required: true },
  marks: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Result', resultSchema, 'results');
