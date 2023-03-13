const express = require("express");
const Router = express.Router();
const excel = require("exceljs");
const db = require("../models/db");
const College = db.college;
const Placement = db.placement;

Router.post("/add_data", async (req, res) => {
  // check if college already exists
  College.findOne({
    where: {
      email: req.body.email,
    },
  }).then(async (college) => {
    if (!college) {
      res.status(400).send({
        message: "College Does not exist!",
      });
    } else {
      // add data
      const data = req.body.data;
      for(let i = 0; i < data.length; i++){
        const placement = {
          college_id: college.id,
          year: data[i].year,
          branch: data[i].branch,
          total_students: data[i].students,
          eligible_students: data[i].eligible_students,
          pnr_students: data[i].pnr,
          placed_students: data[i].placed,
          offer_letters: data[i].offer_letters,
          lowest_package: data[i].lowest_package,
          highest_package: data[i].highest_package,
          average_package: data[i].average_package,
          number_of_companies: data[i].companies_visited,
        };
        await Placement.create(placement);
      }
      res.status(200).send({
        message: "Data added successfully!",
      });
    }
  });
});

Router.get("/get_data/:college_id", async (req, res) => {
  // get data
  Placement.findAll({
    where: {
      college_id: req.params.college_id,
    },
  }).then((data) => {
    let yearList = [];
    let branchList = [];
    for(let i = 0; i < data.length; i++){
      if(!yearList.includes(data[i].year)){
        yearList.push(data[i].year);
      }
      if(!branchList.includes(data[i].branch)){
        branchList.push(data[i].branch);
      }
    }
    res.status(200).send({
      placement: data,
      yearList: yearList,
      branchList: branchList,
    });
  });
});


Router.put("/update_data", async (req, res) => {
  // update data
  const data = req.body.data;
  Placement.update(
    {
      total_students: data.students,
      eligible_students: data.eligible_students,
      pnr_students: data.pnr,
      placed_students: data.placed,
      offer_letters: data.offer_letters,
      lowest_package: data.lowest_package,
      highest_package: data.highest_package,
      average_package: data.average_package,
      number_of_companies: data.companies_visited,
    },
    {
      where: {
        id: data.id,
      },
    }
  ).then(async (datas) => {
    const placement = await Placement.findOne({
      where: {
        id: data.id,
      },
    });
    res.status(200).send({
      message: "Data updated successfully!",
      placement: placement,
    });
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message,
    });
  });
});


Router.delete("/delete_data/:college_id/:id", async (req, res) => {
  // delete data
  Placement.destroy({
    where: {
      id: req.params.id,
    },
  }).then((data) => {
    Placement.findAll({
      where: {
        college_id: req.params.college_id,
      },
    }).then((data) => {
      let yearList = [];
      let branchList = [];
      for(let i = 0; i < data.length; i++){
        if(!yearList.includes(data[i].year)){
          yearList.push(data[i].year);
        }
        if(!branchList.includes(data[i].branch)){
          branchList.push(data[i].branch);
        }
      }
      res.status(200).send({
        placement: data,
        yearList: yearList,
        branchList: branchList,
      });
    });
  });
});

Router.get("/get_excel_data/:college_id", async (req, res) => {
  
  let workbook = new excel.Workbook();
  let worksheet = workbook.addWorksheet("Placement Data");
  worksheet.columns = [
    { header: "Year", key: "year", width: 10 },
    { header: "Branch", key: "branch", width: 30 },
    { header: "Total Students", key: "total_students", width: 20 },
    { header: "Eligible Students", key: "eligible_students", width: 20 },
    { header: "PNR Students", key: "pnr_students", width: 20 },
    { header: "Placed Students", key: "placed_students", width: 20 },
    { header: "Offer Letters", key: "offer_letters", width: 20 },
    { header: "Lowest Package", key: "lowest_package", width: 20 },
    { header: "Highest Package", key: "highest_package", width: 20 },
    { header: "Average Package", key: "average_package", width: 20 },
    { header: "Number of Companies", key: "number_of_companies", width: 20 },
  ];

  Placement.findAll({
    where: {
      college_id: req.params.college_id,
    },
  }).then(async (data) => {
    worksheet.addRows(data);
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "placement.xlsx"
    );
    await workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  });
});

module.exports = Router;
