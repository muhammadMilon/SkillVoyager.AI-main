const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
    title: { type: String, required: true },
    status: { type: String, enum: ['completed', 'current', 'upcoming'], default: 'upcoming' },
    date: { type: String, required: true }
});

const progressSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    percentage: { type: Number, default: 0 },
    currentMilestone: { type: String, default: "Not started" },
    targetRole: { type: String, default: "Full Stack Developer" },
    missingSkills: { type: [String], default: [] },
    
 
    skillStrength: { 
        type: Map, 
        of: Number, 
        default: () => new Map() 
    }, 

    milestones: { type: [milestoneSchema], default: [] },
    estimatedDays: { type: Number, default: 0 },
    totalStudyHours: { type: Number, default: 0 },

    // ==================== নতুন যোগ করা হলো ====================
    // Activity Matrix চার্টের জন্য
    watchHistory: [
        {
            date: { 
                type: String,           // "2026-03-25" ফরম্যাটে
                required: true 
            },
            hours: { 
                type: Number, 
                required: true 
            }
        }
    ],
    
}, { timestamps: true });

module.exports = mongoose.model('Progress', progressSchema);
