// 📁 main/app.js
import { allocateDiscounts } from "../services/discountService.js";
import { getSampleAgents } from "../sampledata/sampleInput.js";
import { displayResults } from "../views/outputView.js";

// Entry point
const totalKitty = 10000;
const baseAmount = 500; //i used base amount because if any new employee who have not much experience then they should get something.

const agents = getSampleAgents();
const result = allocateDiscounts(totalKitty, baseAmount, agents);
displayResults(result);
