const express = require('express');
const router = express.Router();
const User = require('../models/User');
const QuizResult = require('../models/QuizResult');
const Assignment = require('../models/Assignment');

// ── POST /api/dashboard/watch-history ─────────────────────────────────────────
// Body: { uid, seconds? , minutes? , hours? , date? (YYYY-MM-DD) }
// Adds to User.watchHistory for the given day (defaults: today).
router.post('/watch-history', async (req, res) => {
  try {
    const { uid, seconds, minutes, hours, date } = req.body || {};
    if (!uid) return res.status(400).json({ success: false, message: 'uid required' });

    const addHours =
      (typeof hours === 'number' ? hours : 0) +
      (typeof minutes === 'number' ? minutes / 60 : 0) +
      (typeof seconds === 'number' ? seconds / 3600 : 0);

    if (!Number.isFinite(addHours) || addHours <= 0) {
      return res.status(400).json({ success: false, message: 'seconds/minutes/hours must be > 0' });
    }

    const d = date ? new Date(date) : new Date();
    if (Number.isNaN(d.getTime())) {
      return res.status(400).json({ success: false, message: 'invalid date' });
    }
    const day = new Date(d.getFullYear(), d.getMonth(), d.getDate());

    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if (!Array.isArray(user.watchHistory)) user.watchHistory = [];

    const iso = day.toISOString().split('T')[0];
    const idx = user.watchHistory.findIndex(w =>
      new Date(w.date).toISOString().split('T')[0] === iso
    );

    if (idx >= 0) {
      user.watchHistory[idx].hours = (user.watchHistory[idx].hours || 0) + addHours;
      user.watchHistory[idx].date = day;
    } else {
      user.watchHistory.push({ date: day, hours: addHours });
    }

    await user.save();

    res.status(200).json({ success: true, message: 'watch history updated' });
  } catch (err) {
    console.error('Watch history update error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/stats/:uid', async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Calculate Quiz Stats
    const quizResults = await QuizResult.find({ userEmail: user.email });
    const quizAvg = quizResults.length > 0 
      ? (quizResults.reduce((acc, curr) => acc + curr.percentage, 0) / quizResults.length).toFixed(2)
      : 0;

    // Calculate Assignment Stats
    const assignments = await Assignment.find({ userEmail: user.email });
    const assignmentAvg = assignments.length > 0
      ? (assignments.reduce((acc, curr) => acc + (curr.score/curr.total)*100, 0) / assignments.length).toFixed(2)
      : 0;

    // Watch History (Last 7 days)
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      
      const dayData = user.watchHistory?.find(w => 
        new Date(w.date).toISOString().split('T')[0] === dateStr
      );
      
      last7Days.push({
        date: dateStr,
        hours: dayData ? dayData.hours : 0
      });
    }

    // Milestones Progress
    const onTimeFinishCount = user.progress?.milestones?.filter(m => m.status === 'completed').length || 0;
    const totalMilestones = user.progress?.milestones?.length || 0;

    res.status(200).json({
      success: true,
      data: {
        quizAvg: parseFloat(quizAvg),
        assignmentAvg: parseFloat(assignmentAvg),
        onTimeFinish: onTimeFinishCount,
        totalMilestones: totalMilestones,
        gems: user.gems || 0,
        rewardCount: user.rewardCount || 0,
        watchHistory: last7Days,
        streak: user.streak || 0,
        points: user.points || 0,
        rank: user.rank || 'Bronze Voyager',
        badges: user.badges || []
      }
    });

  } catch (err) {
    console.error('Dashboard stats error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
