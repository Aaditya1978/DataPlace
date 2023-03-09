const db = require("../models/db");
const Placement = db.placement;
const colorPalette = require("./colorPalette");
const chatGPTResponse = require("./chatgpt");

const skipped = (ctx, value) => ctx.p0.skip || ctx.p1.skip ? value : undefined;


// Function to get number of companies data
const numberCompany = async (collegeId) => {
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
    const number_of_companies = placement.number_of_companies
    const index = data.findIndex((item) => item.year === year);
    if (branchList.indexOf(branch) === -1) {
      branchList.push(branch);
    }
    if (index === -1) {
      data.push({
        year,
        [branch]: number_of_companies,
      });
    } else {
      data[index][branch] = number_of_companies;
    }
  }

  // Sort data by year
  sortedData = data.sort((a, b) => a.year - b.year);
  const yearList = sortedData.map((item) => item.year);

  // Get chatgpt response
  // const chatQuestion = `Given number of companies visiting college data below, ${JSON.stringify(sortedData)} write areas to improve on in points from data and nothing extra text should be written`
  // const numberCompanyAnalysis = await chatGPTResponse(chatQuestion);

  // create data object for chart
  const numberCompanyData = [];
  for (let i = 0; i < branchList.length; i++) {
    const branch = branchList[i];
    const branchData = sortedData.map((item) => {
      if (item[branch] === undefined) {
        return null;
      }
      return item[branch];
    });
    numberCompanyData.push({
      label: branch,
      data: branchData,
      borderColor: colorPalette[i],
      backgroundColor: colorPalette[i],
      pointStyle: 'circle',
      pointRadius: 2,
      segment: {
        borderDash: (ctx) => skipped(ctx, [5, 5]),
      },
      spanGaps: true,
      tension: 0.2,
    });
  }

  // return data object
  const numberCompanyDataObj = {
    yearList: yearList,
    numberCompanyData: numberCompanyData,
    sortedData: sortedData,
  };
  return numberCompanyDataObj;
};

module.exports = numberCompany;
