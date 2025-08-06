import { normalizeAgents } from "../models/agentModel.js";

const DEFAULT_WEIGHTS = {
  performanceScore: 0.4,
  seniorityMonths: 0.2,
  targetAchievedPercent: 0.2,
  activeClients: 0.2
};

export function allocateDiscounts(totalKitty, baseAmount, agents) {
  const numAgents = agents.length;
  const baseRequired = baseAmount * numAgents;

  if (numAgents === 0) {
    return { error: "No agents to allocate." };
  }

  if (baseRequired > totalKitty) {
    return { error: "Total kitty too small to cover base amount for all agents." };
  }

  const normalizedAgents = normalizeAgents(agents, DEFAULT_WEIGHTS);
  const totalScore = normalizedAgents.reduce((sum, a) => sum + a.normalizedScore, 0);
  const remainingKitty = totalKitty - baseRequired;

  const allocations = normalizedAgents.map(agent => {
    const proportion = totalScore > 0 ? agent.normalizedScore / totalScore : 1 / numAgents;
    const bonus = Math.round(proportion * remainingKitty * 100) / 100;
    const totalAmount = baseAmount + bonus;

    const justification = Object.keys(DEFAULT_WEIGHTS)
      .map(k => `${k}: ${agent[k]}`)
      .join(", ");

    return {
      id: agent.id,
      allocatedAmount: Math.round(totalAmount * 100) / 100,
      justification
    };
  });

  // Fix rounding gap
  const allocatedSum = allocations.reduce((sum, a) => sum + a.allocatedAmount, 0);
  const roundingGap = Math.round((totalKitty - allocatedSum) * 100) / 100;
  if (roundingGap !== 0) {
    allocations[allocations.length - 1].allocatedAmount += roundingGap;
  }

  return {
    allocations,
    totalAllocated: allocations.reduce((sum, a) => sum + a.allocatedAmount, 0)
  };
}
