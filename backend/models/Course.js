const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  videoId: { type: String, default: null },
  videoUrl: { type: String, default: null },
  thumbnail: { type: String, default: null },
  category: { type: String, required: true, trim: true },
  price: { type: Number, default: 0 },
  isFree: { type: Boolean, default: false },
  level: { type: String, default: 'Beginner' },
  duration: { type: String, default: null },
  lectures: { type: Number, default: 0 },
  projects: { type: Number, default: 0 },
  quizzes: { type: Number, default: 0 },
  tags: [{ type: String }],
  learn: [{ type: String }],
  createdBy: { type: String, default: null }, // admin uid
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
