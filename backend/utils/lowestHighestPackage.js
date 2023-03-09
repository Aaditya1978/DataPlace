const db = require("../models/db");
const Placement = db.placement;
const colorPalette = require("./colorPalette");
const chatGPTResponse = require("./chatgpt");


// Function to get data for lowest and highest package chart
const lowestHighestPackage = async (collegeId) => {
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
    const lowest_package = placement.lowest_package;
    const highest_package = placement.highest_package;
    const index = data.findIndex((item) => item.year === year);
    if (branchList.indexOf(branch) === -1) {
      branchList.push(branch);
    }
    if (index === -1) {
      data.push({
        year,
        [branch]: {
            lowest_package: lowest_package,
            highest_package: highest_package,
        },
      });
    } else {
      data[index][branch] = {
        lowest_package: lowest_package,
        highest_package: highest_package,
     };
    }
  }

  // Sort data by year
  sortedData = data.sort((a, b) => a.year - b.year);
  const yearList = sortedData.map((item) => item.year);

  // Get chatgpt response
  // const chatQuestion = `Given lowest and highest package placement for college data below, ${JSON.stringify(sortedData)} write areas to improve on in points from data and nothing extra text should be written`
  // const lowestHighestPackageAnalysis = await chatGPTResponse(chatQuestion);

  // create data object for chart
  const lowestHighestPackageData = [];
  for (let i = 0; i < sortedData.length; i++) {
    const year = sortedData[i].year;
    const lowestHighestPackageDataTempObj = {
        year: year,
        lowest_package_data: {
            label: "Lowest Package",
            data: [],
            borderColor: colorPalette[0],
            backgroundColor: "#9AD0F5",
            stack: "Stack 0",
        },
        highest_package_data: {
            label: "Highest Package",
            data: [],
            borderColor: colorPalette[1],
            backgroundColor: "#FFB1C1",
            stack: "Stack 1",
        }
    };
    for (let j = 0; j < branchList.length; j++) {
        const branch = branchList[j];
        if (sortedData[i][branch] === undefined) {
            lowestHighestPackageDataTempObj.lowest_package_data.data.push(0);
            lowestHighestPackageDataTempObj.highest_package_data.data.push(0);
            continue;
        }
        lowestHighestPackageDataTempObj.lowest_package_data.data.push(sortedData[i][branch].lowest_package);
        lowestHighestPackageDataTempObj.highest_package_data.data.push(sortedData[i][branch].highest_package);
    }
    lowestHighestPackageData.push(lowestHighestPackageDataTempObj);
  }

  // return data object
  const lowestHighestPackageDataObj = {
    yearList: yearList,
    branchList: branchList,
    lowestHighestPackageData: lowestHighestPackageData,
    sortedData: sortedData,
  };
  return lowestHighestPackageDataObj;
};

module.exports = lowestHighestPackage;
