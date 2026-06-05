const express = require('express');
const router = express.Router();
const { getAllCourses, createCourse, deleteCourse } = require('../controllers/course.controller');

// GET  /api/courses       → list all courses
router.get('/', getAllCourses);

// POST /api/courses       → create a course (admin)
router.post('/', createCourse);

// DELETE /api/courses/:id → delete a course (admin)
router.delete('/:id', deleteCourse);

module.exports = router;
