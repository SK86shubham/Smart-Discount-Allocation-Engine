// Normalize and score agent data
export function normalizeAgents(agents, weights) {
  const maxValues = {};
  for (const key of Object.keys(weights)) {
    maxValues[key] = Math.max(...agents.map(agent => agent[key]), 1);
  }

  return agents.map(agent => {
    const score = Object.keys(weights).reduce((acc, key) => {
      const norm = maxValues[key] === 0 ? 0 : agent[key] / maxValues[key];
      return acc + weights[key] * norm;
    }, 0);

    return {
      ...agent,
      normalizedScore: score
    };
  });
}
