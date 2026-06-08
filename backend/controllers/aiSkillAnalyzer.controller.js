export const analyzeSkills = (req, res) => {
  const { skills } = req.body;

  const result = {
    level: "Intermediate Full Stack Developer",
    strengths: skills.filter((s) =>
      ["react", "node", "next"].includes(s.toLowerCase())
    ),
    gaps: ["system design", "testing", "devops basics"],
  };

  res.json(result);
};