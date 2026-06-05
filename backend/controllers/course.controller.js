const Course = require('../models/Course');

// GET /api/courses — fetch all courses (newest first)
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json({ success: true, courses });
  } catch (err) {
    console.error('Get courses error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch courses' });
  }
};

// POST /api/courses — create a new course (admin)
exports.createCourse = async (req, res) => {
  try {
    const { title, description, videoId, videoUrl, thumbnail, category, price, createdBy, level, duration, lectures, projects, quizzes, tags, learn } = req.body;

    // Validate required fields
    if (!title || !category) {
      return res.status(400).json({ success: false, message: 'Title and category are required' });
    }

    // Determine if free
    const isFree = price === 'free' || price === 0 || price === '0' || !price;
    const finalPrice = isFree ? 0 : Number(price);

    // Auto-generate thumbnail from videoId if not provided
    let finalThumbnail = thumbnail || null;
    if (!finalThumbnail && videoId) {
      finalThumbnail = `https://img.youtube.com/vi/${videoId}/0.jpg`;
    }

    // Auto-extract videoId from videoUrl if videoId not provided
    let finalVideoId = videoId || null;
    if (!finalVideoId && videoUrl) {
      const match = videoUrl.match(/[?&]v=([^&]+)/);
      if (match) finalVideoId = match[1];
    }

    const course = await Course.create({
      title,
      description: description || '',
      videoId: finalVideoId,
      videoUrl: videoUrl || null,
      thumbnail: finalThumbnail,
      category,
      price: finalPrice,
      isFree,
      level: level || 'Beginner',
      duration: duration || null,
      lectures: Number(lectures) || 0,
      projects: Number(projects) || 0,
      quizzes: Number(quizzes) || 0,
      tags: tags || [],
      learn: learn || [],
      createdBy: createdBy || null,
    });

    console.log('✓ Course created:', course.title);
    res.status(201).json({ success: true, course });
  } catch (err) {
    console.error('Create course error:', err);
    res.status(500).json({ success: false, message: 'Failed to create course' });
  }
};

// DELETE /api/courses/:id — delete a course (admin)
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    console.log('✓ Course deleted:', course.title);
    res.json({ success: true, message: 'Course deleted' });
  } catch (err) {
    console.error('Delete course error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete course' });
  }
};
