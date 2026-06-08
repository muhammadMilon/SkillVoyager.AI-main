export const buildRoadmap = (progress = 0) => {
  if (progress < 30) return ["Learn HTML/CSS", "Basic JS"];
  if (progress < 60) return ["React", "Node.js"];
  return ["System Design", "Advanced Projects", "Deployment"];
};