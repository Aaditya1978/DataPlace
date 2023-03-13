const express = require("express");
const Router = express.Router();
const db = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const excel = require("exceljs");
const { send_block_mail, send_unblock_mail } = require("../utils/mailSend");
const Admin = db.admin;
const College = db.college;
const Placement = db.placement;
const Contact = db.contact;
const saltRounds = 10;

// function to encrypt password
const encryptPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        reject(err);
      }
      resolve(hash);
    });
  });
};

// function to compare password
const comparePassword = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

Router.post("/register", async (req, res) => {
  // check if college already exists
  Admin.findOne({
    where: {
      email: req.body.email,
    },
  }).then(async (admin) => {
    if (admin) {
      res.status(400).send({
        message: "Admin already exists!",
      });
    } else {
      // create admin
      let admin;
      const password = req.body.password;
      await encryptPassword(password).then((hash) => {
        admin = {
          name: req.body.name,
          email: req.body.email,
          password: hash,
        };
      });

      // save college in the database
      Admin.create(admin)
        .then((data) => {
          const token = jwt.sign({ id: data.id }, "dataplace", {
            expiresIn: "4h",
          });
          res.send({
            message: "Admin registered successfully!",
            token: token,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Some error occurred while creating account.",
          });
        });
    }
  });
});

Router.post("/login", async (req, res) => {
  // check if admin exists
  Admin.findOne({
    where: {
      email: req.body.email,
    },
  }).then((admin) => {
    if (!admin) {
      res.status(400).send({
        message: "Admin does not exist!",
      });
    } else {
      // compare password
      comparePassword(req.body.password, admin.password).then((result) => {
        if (result) {
          const token = jwt.sign({ id: admin.id }, "dataplace", {
            expiresIn: "4h",
          });
          res.send({
            token: token,
            message: "Login successful!",
          });
        } else {
          res.status(400).send({
            message: "Invalid password!",
          });
        }
      });
    }
  });
});

Router.get("/get_admin/:token", async (req, res) => {
  // check if admin exists
  const token = req.params.token;
  try {
    const decoded = jwt.verify(token, "dataplace");
    if (decoded) {
      Admin.findOne({
        where: {
          id: decoded.id,
        },
      }).then((admin) => {
        if (!admin) {
          res.status(400).send({
            message: "Admin does not exist!",
          });
        } else {
          res.send({
            admin: admin,
          });
        }
      });
    } else {
      res.status(400).send({
        message: "Invalid token!",
      });
    }
  } catch (err) {
    res.status(400).send({
      message: "Invalid token!",
    });
  }
});

Router.get("/manageData", async (req, res) => {
  let no_of_colleges;
  await College.findAll().then((colleges) => {
    no_of_colleges = colleges.length;
  });

  let no_of_placements;
  await Placement.findAll().then((placements) => {
    no_of_placements = placements.length;
  });

  let no_of_locations;
  await College.findAll({
    attributes: ["state"],
    group: ["state"],
  }).then((locations) => {
    no_of_locations = locations.length;
  });

  let state_wise_data = {};
  let state_wise_data2 = [];
  await College.findAll({
    attributes: ["state", [db.sequelize.fn("COUNT", "state"), "count"]],
    group: ["state"],
  }).then((locations) => {
    locations.forEach((location) => {
      state_wise_data[location.state.toString()] = location.dataValues.count;
      state_wise_data2.push({
        state: location.state,
        count: location.dataValues.count,
      });
    });
  });

  res.status(200).send({
    card_data: {
      no_of_colleges: no_of_colleges,
      no_of_placements: no_of_placements,
      no_of_locations: no_of_locations,
    },
    state_wise_data: state_wise_data,
    state_wise_data2: state_wise_data2,
  });
});

Router.get("/get_data_by_state/:state", async (req, res) => {
  let state = req.params.state;
  await College.findAll({
    where: {
      state: state,
    },
  }).then((data) => {
    res.status(200).send({
      data: data,
    });
  });
});

Router.get("/get_data_by_college/:college", async (req, res) => {
  let college = req.params.college;
  await College.findOne({
    where: {
      id: college,
    },
  }).then(async (college) => {
    await Placement.findAll({
      where: {
        college_id: college.id,
      },
    }).then((placements) => {
      let yearList = [];
      let branchList = [];
      for (let i = 0; i < placements.length; i++) {
        if (!yearList.includes(placements[i].year)) {
          yearList.push(placements[i].year);
        }
        if (!branchList.includes(placements[i].branch)) {
          branchList.push(placements[i].branch);
        }
      }
      res.status(200).send({
        college: college,
        placements: placements,
        yearList: yearList,
        branchList: branchList,
      });
    });
  });
});


Router.post("/block_college", async (req, res) => {
  const college_id = req.body.college_id;
  const block_reason = req.body.block_reason;
  const email = req.body.email;
  College.update(
    {
      isBlocked: true,
    },
    {
      where: {
        id: college_id,
      },
    }
  ).then(async (data) => {
    await send_block_mail(email, block_reason);
    res.status(200).send({
      message: "College blocked successfully!",
    });
  })
  .catch((err) => {
    res.status(400).send({
      message: "Some error occurred while blocking college!",
    });
  });
});


Router.post("/unblock_college", async (req, res) => {
  const college_id = req.body.college_id;
  const email = req.body.email;
  College.update(
    {
      isBlocked: false,
    },
    {
      where: {
        id: college_id,
      },
    }
  ).then(async (data) => {
    await send_unblock_mail(email);
    res.status(200).send({
      message: "College unblocked successfully!",
    });
  })
  .catch((err) => {
    res.status(400).send({
      message: "Some error occurred while unblocking college!",
    });
  });
});


Router.get("/get_contact", async (req, res) => {
  await Contact.findAll({
    where: {
      status: "pending",
    },
  }).then((data) => {
    res.status(200).send({
      data: data,
    });
  });
});

Router.post("/contact_response", async (req, res) => {
  const admin_id = parseInt(req.body.admin_id);
  const response = req.body.response;
  const contact_id = parseInt(req.body.contact_id);
  Contact.update(
    {
      response: response,
      status: "responded",
      admin_id: admin_id, 
      response_date: new Date(),
    },
    {
      where: {
        id: contact_id,
      },
    }
  ).then((data) => {
    res.status(200).send({
      message: "Response sent successfully!",
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
