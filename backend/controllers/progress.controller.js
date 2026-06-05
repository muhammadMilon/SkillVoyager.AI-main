// const Progress = require('../models/Progress');

// exports.getProgress = async (req, res) => {
//   try {
//     const { uid } = req.query;

//     if (!uid) {
//       return res.status(400).json({ success: false, message: 'User ID (uid) is required' });
//     }

//     let progress = await Progress.findOne({ uid });

//     if (!progress) {
//       progress = new Progress({
//         uid,
//         percentage: 0,
//         currentMilestone: "Not started",
//         targetRole: "Full Stack Developer",
//         missingSkills: [],
//         skillStrength: new Map([
//           ["React", 30],
//           ["Node.js", 20],
//           ["Python", 10],
//           ["Git", 50],
//           ["UI/UX", 15],
//           ["Docker", 5]
//         ]),
//         milestones: [],
//         estimatedDays: 90,
//         totalStudyHours: 0,

//         // ==================== Activity Matrix এর জন্য যোগ করা হলো ====================
//         watchHistory: [
//           { date: "2026-03-25", hours: 2.5 },
//           { date: "2026-03-26", hours: 1.8 },
//           { date: "2026-03-27", hours: 3.2 },
//           { date: "2026-03-28", hours: 0.9 },
//           { date: "2026-03-29", hours: 4.1 },
//           { date: "2026-03-30", hours: 2.7 },
//           { date: "2026-03-31", hours: 3.5 },
//         ]
//         // =========================================================================
//       });

//       await progress.save();
//       console.log(`New progress created for uid: ${uid}`);
//     }

//     res.status(200).json({
//       success: true,
//       data: progress
//     });
//   } catch (error) {
//     console.error('Get progress error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error while fetching progress',
//       error: error.message
//     });
//   }
// };



const Progress = require('../models/Progress');

exports.getProgress = async (req, res) => {
  try {
    const { uid } = req.query;

    if (!uid) {
      return res.status(400).json({ success: false, message: 'User ID (uid) is required' });
    }

    let progress = await Progress.findOne({ uid });

    if (!progress) {
      progress = new Progress({
        uid,
        percentage: 0,
        currentMilestone: "Not started",
        targetRole: "Full Stack Developer",
        missingSkills: [],
        skillStrength: new Map([
          ["React", 30],
          ["Node.js", 20],
          ["Python", 10],
          ["Git", 50],
          ["UI/UX", 15],
          ["Docker", 5]
        ]),
        milestones: [],
        estimatedDays: 90,
        totalStudyHours: 0,

        watchHistory: [
          { date: "2026-03-25", hours: 2.5 },
          { date: "2026-03-26", hours: 1.8 },
          { date: "2026-03-27", hours: 3.2 },
          { date: "2026-03-28", hours: 0.9 },
          { date: "2026-03-29", hours: 4.1 },
          { date: "2026-03-30", hours: 2.7 },
          { date: "2026-03-31", hours: 3.5 },
        ]
      });

      await progress.save();
      console.log(`New progress created for uid: ${uid}`);
    }

    res.status(200).json({
      success: true,
      data: progress   // এখানে পুরো progress অবজেক্ট যাচ্ছে, watchHistory সহ
    });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching progress',
      error: error.message
    });
  }
};