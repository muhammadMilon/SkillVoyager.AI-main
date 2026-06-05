const express = require('express');
const router  = express.Router();
const User    = require('../models/User');

// ── helpers ───────────────────────────────────────────────────────────────────
const TIER_LABEL = (pts) => {
    if (pts >= 5000) return { label: 'Legend', icon: '⚡' };
    if (pts >= 2000) return { label: 'Master', icon: '💎' };
    if (pts >= 1000) return { label: 'Expert', icon: '🔥' };
    if (pts >= 500)  return { label: 'Rising', icon: '🌱' };
    return                  { label: 'Rookie', icon: '⭐' };
};

// ── GET /api/leaderboard ──────────────────────────────────────────────────────
// ?filter=all|weekly|monthly   (default: all)
router.get('/', async (req, res) => {
    try {
        const { filter = 'all' } = req.query;

        // choose sort field
        const sortSpec =
            filter === 'weekly'  ? { weeklyPoints: -1 } :
            filter === 'monthly' ? { monthlyPoints: -1 } :
            // all-time: keep points as primary, use experience as tiebreaker
            { points: -1, experience: -1 };

        // fetch top 100 users sorted by chosen field
        const users = await User.find({})
            .sort(sortSpec)
            .limit(100)
            .select('uid email displayName photoURL points weeklyPoints monthlyPoints experience streak onboarding previousRank createdAt')
            .lean();

        // snapshot current ranks → save as previousRank (run async, don't await)
        (async () => {
            try {
                const bulk = User.collection.initializeUnorderedBulkOp();
                users.forEach((u, idx) => {
                    bulk.find({ _id: u._id }).updateOne({ $set: { previousRank: idx + 1 } });
                });
                if (users.length) await bulk.execute();
            } catch (_) { /* non-critical */ }
        })();

        // build response
        const data = users.map((u, idx) => {
            const basePoints = u.points || 0;
            // conservative fallback: only use experience when points is 0
            const allTime = basePoints > 0 ? basePoints : (u.experience || 0);
            const pts      = filter === 'weekly'  ? (u.weeklyPoints  || 0)
                           : filter === 'monthly' ? (u.monthlyPoints || 0)
                           : allTime;
            const rankChange = u.previousRank != null ? u.previousRank - (idx + 1) : 0;
            const tier     = TIER_LABEL(allTime);

            return {
                _id:         u._id,
                email:       u.email,
                displayName: u.displayName || u.email?.split('@')[0] || 'Anonymous',
                photoURL:    u.photoURL,
                points:      pts,
                allTimePoints: allTime,
                weeklyPoints:  u.weeklyPoints  || 0,
                monthlyPoints: u.monthlyPoints || 0,
                streak:        u.streak        || 0,
                rankChange,          // positive = moved up, negative = moved down
                tier:          tier.label,
                tierIcon:      tier.icon,
                onboarding: {
                    institution: u.onboarding?.institution || null,
                    role:        u.onboarding?.role        || null,
                    targetCareer: u.onboarding?.targetCareer || null,
                },
                joinedAt: u.createdAt,
            };
        });

        res.json(data);
    } catch (err) {
        console.error('Leaderboard error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// ── GET /api/leaderboard/user-points?email=xxx ────────────────────────────────
router.get('/user-points', async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) return res.status(400).json({ message: 'email required' });

        const u = await User.findOne({ email }).lean();
        if (!u) return res.status(404).json({ message: 'User not found' });

        const basePoints = u.points || 0;
        const allTime = basePoints > 0 ? basePoints : (u.experience || 0);

        // compute rank (count users with more points)
        const rank = basePoints > 0
            ? (await User.countDocuments({ points: { $gt: basePoints } })) + 1
            : (await User.countDocuments({
                $or: [
                    { points: { $gt: 0 } }, // any positive points outranks 0-points users
                    { $and: [{ points: 0 }, { experience: { $gt: allTime } }] },
                ]
            })) + 1;

        res.json({
            email:        u.email,
            displayName:  u.displayName,
            photoURL:     u.photoURL,
            points:       allTime,
            weeklyPoints: u.weeklyPoints  || 0,
            monthlyPoints:u.monthlyPoints || 0,
            streak:       u.streak        || 0,
            rank,
            tier:         TIER_LABEL(allTime).label,
            tierIcon:     TIER_LABEL(allTime).icon,
            onboarding: {
                institution:  u.onboarding?.institution  || null,
                targetCareer: u.onboarding?.targetCareer || null,
            },
        });
    } catch (err) {
        console.error('user-points error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// ── POST /api/leaderboard/add-points ─────────────────────────────────────────
// Body: { uid, points }   — call this whenever user completes a roadmap step
router.post('/add-points', async (req, res) => {
    try {
        const { uid, points = 10 } = req.body;
        if (!uid) return res.status(400).json({ message: 'uid required' });

        const now   = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        const u = await User.findOne({ uid });
        if (!u) return res.status(404).json({ message: 'User not found' });

        // update streak
        let newStreak = u.streak || 0;
        if (u.lastStreakDate) {
            const lastDate = new Date(u.lastStreakDate);
            const last     = new Date(lastDate.getFullYear(), lastDate.getMonth(), lastDate.getDate());
            const diffDays = Math.round((today - last) / 86_400_000);
            if (diffDays === 1)      newStreak += 1;   // consecutive day
            else if (diffDays > 1)   newStreak = 1;    // streak broken
            // diffDays === 0 → same day, streak unchanged
        } else {
            newStreak = 1;
        }

        const updated = await User.findOneAndUpdate(
            { uid },
            {
                $inc: {
                    points:        points,
                    weeklyPoints:  points,
                    monthlyPoints: points,
                    experience:    points,
                },
                $set: {
                    streak:        newStreak,
                    lastStreakDate: today,
                }
            },
            { new: true }
        );

        res.json({
            points:       updated.points,
            weeklyPoints: updated.weeklyPoints,
            streak:       updated.streak,
            message:      `+${points} XP added!`
        });
    } catch (err) {
        console.error('add-points error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// ── POST /api/leaderboard/reset-weekly ───────────────────────────────────────
// Run via cron every Monday midnight
router.post('/reset-weekly', async (req, res) => {
    try {
        await User.updateMany({}, { $set: { weeklyPoints: 0 } });
        res.json({ message: 'Weekly points reset.' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// ── POST /api/leaderboard/reset-monthly ──────────────────────────────────────
// Run via cron every 1st of month
router.post('/reset-monthly', async (req, res) => {
    try {
        await User.updateMany({}, { $set: { monthlyPoints: 0 } });
        res.json({ message: 'Monthly points reset.' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;