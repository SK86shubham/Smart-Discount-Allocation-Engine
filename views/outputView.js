export function displayResults(result) {
  if (result.error) {
    console.error("❌ Error:", result.error);
  } else {
    console.log("✅ Discount Allocation Result:");
    console.table(result.allocations);
    console.log("Total Allocated:", result.totalAllocated);
  }
}
