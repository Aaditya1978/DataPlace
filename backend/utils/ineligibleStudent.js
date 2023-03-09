const db = require("../models/db");
const Placement = db.placement;
const colorPalette = require("./colorPalette");
const chatGPTResponse = require("./chatgpt");


// Function to get data for ineligible students chart
const ineligibleStudent = async (collegeId) => {
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
    const number_of_ineligible_students = placement.total_students - placement.eligible_students - placement.pnr_students;
    const index = data.findIndex((item) => item.year === year);
    if (branchList.indexOf(branch) === -1) {
      branchList.push(branch);
    }
    if (index === -1) {
      data.push({
        year,
        [branch]: number_of_ineligible_students,
      });
    } else {
      data[index][branch] = number_of_ineligible_students;
    }
  }

  // Sort data by year
  sortedData = data.sort((a, b) => a.year - b.year);
  const yearList = sortedData.map((item) => item.year);

  // Get chatgpt response
  // const chatQuestion = `Given number of ineligible students for college data below, ${JSON.stringify(sortedData)} write areas to improve on in points from data and nothing extra text should be written`
  // const ineligibleStudentAnalysis = await chatGPTResponse(chatQuestion);

  // create data object for chart
  const ineligibleStudentData = [];
  for (let i = 0; i < branchList.length; i++) {
    const branch = branchList[i];
    const branchData = sortedData.map((item) => {
      if (item[branch] === undefined) {
        return null;
      }
      return item[branch];
    });
    ineligibleStudentData.push({
      label: branch,
      data: branchData,
      backgroundColor: colorPalette[i],
      stack: "Stack " + i,
    });
  }

  // return data object
  const ineligibleStudentDataObj = {
    yearList: yearList,
    ineligibleStudentData: ineligibleStudentData,
    sortedData: sortedData,
  };
  return ineligibleStudentDataObj;
};

module.exports = ineligibleStudent;
