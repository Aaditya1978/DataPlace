const db = require("../models/db");
const Placement = db.placement;
const colorPalette = require("./colorPalette");
const chatGPTResponse = require("./chatgpt");


// Function to get data for placement percent chart
const percentData = async (collegeId) => {
  const placements = await Placement.findAll({
    where: { college_id: collegeId },
  });
  const data = [];
  const branchList = [];
  // Loop through placements and create data for chart
  for (let i = 0; i < placements.length; i++) {
    const placement = placements[i];
    const year = placement.year;
    const branch = placement.branch;
    const percent =
      (placement.placed_students / placement.eligible_students) * 100;
    const roundedPercent = Math.round((percent + Number.EPSILON) * 100) / 100;
    const index = data.findIndex((item) => item.year === year);
    if (branchList.indexOf(branch) === -1) {
      branchList.push(branch);
    }
    if (index === -1) {
      data.push({
        year,
        [branch]: roundedPercent,
      });
    } else {
      data[index][branch] = roundedPercent;
    }
  }

  // Sort data by year
  sortedData = data.sort((a, b) => a.year - b.year);
  const yearList = sortedData.map((item) => item.year);

  // Get chatgpt response
  // const chatQuestion = `Given percentage placement data below, ${JSON.stringify(sortedData)} write areas to improve on in points from data and nothing extra text should be written`
  // const percentAnalysis = await chatGPTResponse(chatQuestion);

  // create final data for chart 
  const percentDataList = [];
  for (let i = 0; i < branchList.length; i++) {
    const branch = branchList[i];
    const branchData = sortedData.map((item) => {
      if (item[branch] === undefined) {
        return 0;
      }
      return item[branch];
    });
    percentDataList.push({
      label: branch,
      data: branchData,
      backgroundColor: colorPalette[i],
      stack: "Stack " + i,
    });
  }

  // Return data for chart
  const placementPercentData = {
    yearList: yearList,
    percentData: percentDataList,
    sortedData: sortedData,
  };
  return placementPercentData;
};

module.exports = percentData;
