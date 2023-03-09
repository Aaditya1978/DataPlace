const db = require("../models/db");
const Placement = db.placement;
const colorPalette = require("./colorPalette");
const chatGPTResponse = require("./chatgpt");

const skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined;


// Function to get average package data
const averagePackage = async (collegeId) => {
  const placements = await Placement.findAll({
    where: { college_id: collegeId },
  });
  const data = [];
  const branchList = [];

  // Loop through placements and create data object
  for (let i = 0; i < placements.length; i++) {
    const placement = placements[i];
    const year = placement.year;
    const branch = placement.branch;
    const average_package = placement.average_package;
    const index = data.findIndex((item) => item.year === year);
    if (branchList.indexOf(branch) === -1) {
      branchList.push(branch);
    }
    if (index === -1) {
      data.push({
        year,
        [branch]: average_package,
      });
    } else {
      data[index][branch] = average_package;
    }
  }

  // Sort data by year
  sortedData = data.sort((a, b) => a.year - b.year);
  const yearList = sortedData.map((item) => item.year);

  // Get chatgpt response
  // const chatQuestion = `Given average package data below, ${JSON.stringify(sortedData)} write areas to improve on in points from data and nothing extra text should be written`
  // const averagePackageAnalysis = await chatGPTResponse(chatQuestion);

  // create data object for chart
  const averagePackageData = [];
  for (let i = 0; i < branchList.length; i++) {
    const branch = branchList[i];
    const branchData = sortedData.map((item) => {
      if (item[branch] === undefined) {
        return null;
      }
      return item[branch];
    });
    averagePackageData.push({
      label: branch,
      data: branchData,
      borderColor: colorPalette[i],
      segment: {
        borderDash: (ctx) => skipped(ctx, [5, 5]),
      },
      spanGaps: true,
      tension: 0.2,
    });
  }

  // return data object
  const averagePackageDataObj = {
    yearList: yearList,
    averagePackageData: averagePackageData,
    sortedData: sortedData,
  };
  return averagePackageDataObj;
};

module.exports = averagePackage;
