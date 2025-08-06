## 💼 Smart Discount Allocation Engine

### 📌 Problem Statement

A company operating across multiple locations needs to distribute a fixed discount pool (called the **discount kitty**) among its **sales agents**.
Each agent has different attributes such as:

- **Performance score**
- **Seniority (months worked)**
- **Target achievement %**
- **Number of active clients**

The challenge is to allocate the kitty in a way that is:

- **Fair**
- **Explainable**
- **Data-driven**
- **Extensible and automated** for future use

---

### 🌟 Objective

Build a CLI/script-based tool that:

- Accepts:
  - The total discount kitty (e.g., ₹10,000)
  - List of agents and their attributes
  - Optional configuration (e.g., min/max limits, weightage)
- Outputs:
  - A JSON object with:
    - Allocation per agent
    - Brief justification for each agent
- Ensures:
  - Kitty is not exceeded
  - Allocation logic is fair and explainable
  - Code is modular and future-proof

---

### 💡 Approach

We use a **Base Amount + Weighted Bonus** strategy:

#### 1. **Base Amount Allocation**

Each agent receives a **guaranteed fixed base** (e.g., ₹500) to ensure:

- Fairness for minimum effort
- Simplicity in understanding

This also safeguards against scenarios where a high-performing agent might dominate the entire pool — some amount is still fairly distributed to all.

#### 2. **Bonus Pool Allocation**

Remaining kitty (after base distribution) is split based on:

- **Normalized and weighted scores** from agent attributes:
  - Performance score
  - Seniority
  - Target achievement
  - Active clients

Each attribute’s contribution is **customizable via **`` for flexibility.

#### 3. **Rounding-Safe Distribution**

- Bonus amounts are calculated with `Math.floor` to prevent exceeding the kitty
- Any small leftover amount (from rounding) is assigned to the top-ranked agent

---

### ⚙️ Configurable Settings (via `config/weights.json`)

{
  "weights": {
    "performanceScore": 0.4,
    "seniorityMonths": 0.2,
    "targetAchievedPercent": 0.3,
    "activeClients": 0.1
  },
  "minPerAgent": 300,
  "maxPerAgent": 1000
}


- Weights allow tuning of business priorities
- Min/Max limits ensure allocations stay reasonable

---

### 📁 Project Structure (MVC)

.
├── main/
│   └── app.js                # Entry point
├── services/
│   └── discountService.js    # Allocation logic
├── data/
│   └── sampleInput.js        # Sample agent input
├── views/
│   └── outputView.js         # Output formatting          
└── test/
    └── testCases.js          # Unit test scenarios

---

### ✅ Test Scenarios Included

1. **Normal Case** – Varied agent scores
2. **All-Same Scores** – Identical attributes for fairness check
3. **Rounding Edge Case** – Tests leftover kitty handling

---

### 🧪 How to Run

1. Clone the repo
2. Make sure you have **Node.js** installed
3. Run:
node main/app.js


### 📊 Example Output

json
{
  "allocations": [
    {
      "id": "A1",
      "allocatedAmount": 900,
      "justification": "High performance and target achievement"
    },
    ...
  ],
  "summary": {
    "totalAllocated": 10000,
    "remainingKitty": 0
  }
}

---

### ✅ Why Base + Weighted Bonus?

| Reason                            | Base Amount | Weighted Bonus |
| --------------------------------- | ----------- | -------------- |
| Ensures fairness                  | ✅           | ❌              |
| Rewards top performers            | ❌           | ✅              |
| Prevents outliers from dominating | ✅           | ❌              |
| Reflects real contribution        | ❌           | ✅              |



