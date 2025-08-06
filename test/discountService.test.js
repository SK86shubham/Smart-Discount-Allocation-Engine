//To meet the requirement “3 test cases which you have given in your problem”, we should add a test script file and define the 3 
// scenarios inside it.
//📁 tests/discountService.test.js

//📝 Where we Are Testing:
//we are testing inside tests/discountService.test.js (new file). 
// This keeps test cases separate from the main app — a best practice.

// ✅ How to Run the Test
// From terminal:

// node tests/discountService.test.js


import { allocateDiscounts } from "../services/discountService.js";

function runTest(description, totalKitty, baseAmount, agents, expected) {
  const result = allocateDiscounts(totalKitty, baseAmount, agents);
  console.log(`\n🧪 ${description}`);
  console.table(result.allocations);
  console.log("Total Allocated:", result.totalAllocated);
}

// ✅ Normal Case: Varying data
const agentsNormal = [
  { id: "A", performanceScore: 90, seniorityMonths: 24, targetAchievedPercent: 95, activeClients: 12 },
  { id: "B", performanceScore: 70, seniorityMonths: 12, targetAchievedPercent: 75, activeClients: 6 },
  { id: "C", performanceScore: 85, seniorityMonths: 36, targetAchievedPercent: 80, activeClients: 10 },
];
runTest("Normal Case", 10000, 500, agentsNormal);

// ✅ All-Same Scores Case
const agentsSame = [
  { id: "X1", performanceScore: 50, seniorityMonths: 10, targetAchievedPercent: 80, activeClients: 5 },
  { id: "X2", performanceScore: 50, seniorityMonths: 10, targetAchievedPercent: 80, activeClients: 5 },
  { id: "X3", performanceScore: 50, seniorityMonths: 10, targetAchievedPercent: 80, activeClients: 5 },
];
runTest("All-Same Scores Case", 10000, 500, agentsSame);

// ✅ Rounding Edge Case: Total not divisible cleanly
const agentsRounding = [
  { id: "Y1", performanceScore: 100, seniorityMonths: 10, targetAchievedPercent: 100, activeClients: 10 },
  { id: "Y2", performanceScore: 0, seniorityMonths: 0, targetAchievedPercent: 0, activeClients: 0 },
];
runTest("Rounding Edge Case", 10001, 500, agentsRounding);  // odd kitty to test rounding


// 💭 Why use ₹10001 in the original Rounding Edge Case?
// It was intentionally chosen to create a situation where:

// The bonus pool is not divisible evenly among agents.

// So we test how your program handles leftover fractions.

// 👇 Breakdown of the Original Setup:
// Total kitty: ₹10,001

// Base per agent: ₹500

// 2 agents

// ➡️ Base allocation = 2 × ₹500 = ₹1000
// ➡️ Bonus pool = ₹10,001 - ₹1000 = ₹9001

// 👀 What’s special about ₹9001?
// It can’t be split evenly.

// For example, say:

// Agent1 gets 70% of bonus → ₹6300.7

// Agent2 gets 30% of bonus → ₹2700.3

// Now comes the rounding issue:

// You can’t pay ₹0.7 or ₹0.3 to someone in reality.

// If you round both amounts down (Math.floor), you get:

// Agent1: ₹6300

// Agent2: ₹2700

// Total: ₹9000 (short by ₹1!)

// So your code needs to:

// Track the leftover ₹1 (from rounding),

// Add it to one agent to ensure:

// Total allocated = ₹10,001 (not less or more)

