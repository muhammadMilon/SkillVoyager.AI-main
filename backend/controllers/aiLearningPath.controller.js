export const generateLearningPath = (req, res) => {
  const { level } = req.body;

  const path = [
    "Master Advanced React Patterns",
    "Learn System Design Basics",
    "Build Production Projects",
    "Testing with Jest & Cypress",
    "CI/CD & Deployment Basics",
  ];

  res.json({ level, path });
};