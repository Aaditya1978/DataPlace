const express = require("express");
const Router = express.Router();
const db = require("../models/db");
const College = db.college;
const percentData = require("../utils/percentData");
const averagePackage = require("../utils/averagePackage");
const numberCompany = require("../utils/numberCompany");
const ineligibleStudent = require("../utils/ineligibleStudent");
const lowestHighestPackage = require("../utils/lowestHighestPackage");
const averageOffer = require("../utils/averageOffer");
const statData = require("../utils/statData");
const chatGPTResponse = require("../utils/chatgpt");


// Route to get placement data for analytics for a college
Router.get("/placementDatas/:collegeId", async (req, res) => {
  if (!req.params.collegeId) {
    res.status(400).send({
      message: "College Id is required!",
    });
  } else {
    const { collegeId } = req.params;
    const college = await College.findOne({
      where: { id: collegeId },
    });
    if (!college) {
      res.status(400).send({
        message: "College Does not exist!",
      });
    } else {
      const placementPercentData = await percentData(collegeId);
      const averagePackageData = await averagePackage(collegeId);
      const numberCompanyData = await numberCompany(collegeId);
      const ineligibleStudentData = await ineligibleStudent(collegeId);
      const lowestHighestPackageData = await lowestHighestPackage(collegeId);
      const averageOfferData = await averageOffer(collegeId);
      const statDataObj = await statData(collegeId);
      res.status(200).send({ placementPercentData, averagePackageData, numberCompanyData, ineligibleStudentData, lowestHighestPackageData, averageOfferData, statDataObj });
    }
  }
});


// route to get response from gpt-3 for data analytics
Router.get("/analytics/:type/:data", async (req, res) => {
  const { type, data } = req.params;
  const response = await chatGPTResponse(type, data);
  res.status(200).send({ response: response });
});

module.exports = Router;
