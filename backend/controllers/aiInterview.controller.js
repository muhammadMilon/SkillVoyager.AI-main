export const getInterviewQuestions = (req, res) => {
  const { role } = req.body;

  const questions = [
    `Explain key concepts of ${role}`,
    "What is event loop in Node.js?",
    "Difference between SQL and NoSQL?",
    "How does caching improve performance?",
  ];

  res.json({ role, questions });
};