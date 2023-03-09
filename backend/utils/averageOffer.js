const db = require("../models/db");
const Placement = db.placement;
const colorPalette = require("./colorPalette");
const chatGPTResponse = require("./chatgpt");


// Function to get data for average offer letter chart
const averageOffer = async (collegeId) => {
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
    const average_offer = placement.offer_letters / placement.placed_students;
    const index = data.findIndex((item) => item.year === year);
    if (branchList.indexOf(branch) === -1) {
      branchList.push(branch);
    }
    if (index === -1) {
      data.push({
        year,
        [branch]: average_offer,
      });
    } else {
      data[index][branch] = average_offer;
    }
  }

  // Sort data by year
  sortedData = data.sort((a, b) => a.year - b.year);
  const yearList = sortedData.map((item) => item.year);

  // Get chatgpt response
  // const chatQuestion = `Given average offere letter per student for college data below, ${JSON.stringify(sortedData)} write areas to improve on in points from data and nothing extra text should be written`
  // const averageOfferAnalysis = await chatGPTResponse(chatQuestion);

  // create data object for chart
  const averageOfferData = [];
  for (let i = 0; i < sortedData.length; i++) {
    const year = sortedData[i].year;
    const averageOfferDataTempObj = {
        year: year,
        average_offer_data: {
            label: "Average Offer Letter",
            data: [],
            backgroundColor: []
        }
    };
    for (let j = 0; j < branchList.length; j++) {
        const branch = branchList[j];
        if (sortedData[i][branch] === undefined) {
            averageOfferDataTempObj.average_offer_data.data.push(0);
            averageOfferDataTempObj.average_offer_data.backgroundColor.push(colorPalette[j]);
            continue;
        }
        averageOfferDataTempObj.average_offer_data.data.push(sortedData[i][branch]);
        averageOfferDataTempObj.average_offer_data.backgroundColor.push(colorPalette[j]);
    }
    averageOfferData.push(averageOfferDataTempObj);
  }

  // return data object
  const averageOfferDataObj = {
    yearList: yearList,
    branchList: branchList,
    averageOfferData: averageOfferData,
    sortedData: sortedData,
  };
  return averageOfferDataObj;
};

module.exports = averageOffer;