const express = require("express");
const Router = express.Router();
const db = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  send_register_mail,
  send_otp_mail,
  send_password_reset_mail,
} = require("../utils/mailSend");
const College = db.college;
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
  College.findOne({
    where: {
      email: req.body.email,
    },
  }).then(async (college) => {
    if (college) {
      res.status(400).send({
        message: "College already exists!",
      });
    } else {
      // create college
      let college;
      const password = req.body.password;
      await encryptPassword(password).then((hash) => {
        college = {
          name: req.body.name,
          phone: req.body.phone,
          email: req.body.email,
          address: req.body.address,
          district: req.body.district,
          state: req.body.state,
          pincode: req.body.pincode,
          password: hash,
        };
      });

      // save college in the database
      College.create(college)
        .then((data) => {
          send_register_mail(data.email, data.name);
          const token = jwt.sign({ id: data.id }, "dataplace", {
            expiresIn: "4h",
          });
          res.send({
            message: "College registered successfully!",
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
  // check if college exists
  College.findOne({
    where: {
      email: req.body.email,
    },
  }).then((college) => {
    if (!college) {
      res.status(400).send({
        message: "College does not exist!",
      });
    } else {
      // compare password
      comparePassword(req.body.password, college.password).then((result) => {
        if (result) {
          const token = jwt.sign({ id: college.id }, "dataplace", {
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

Router.post("/send_otp", async (req, res) => {
  // check if college exists
  College.findOne({
    where: {
      email: req.body.email,
    },
  }).then((college) => {
    if (!college) {
      res.status(400).send({
        message: "College does not exist!",
      });
    } else {
      // generate otp
      const otp = Math.floor(100000 + Math.random() * 900000);
      // send otp to email
      send_otp_mail(req.body.email, otp);
      res.status(200).send({
        otp: otp,
        message: "OTP sent successfully!",
      });
    }
  });
});

Router.post("/change_password", async (req, res) => {
  // check if college exists
  College.findOne({
    where: {
      email: req.body.email,
    },
  }).then(async (college) => {
    if (!college) {
      res.status(400).send({
        message: "College does not exist!",
      });
    } else {
      // update password
      let college;
      const password = req.body.password;
      await encryptPassword(password).then((hash) => {
        college = {
          password: hash,
        };
      });

      College.update(college, {
        where: {
          email: req.body.email,
        },
      })
        .then((data) => {
          send_password_reset_mail(req.body.email);
          res.send({
            message: "Password changed successfully!",
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Some error occurred while changing password.",
          });
        });
    }
  });
});

Router.get("/get_college/:token", async (req, res) => {
  // check if college exists
  const token = req.params.token;
  try{
    const decoded = jwt.verify(token, "dataplace");
    if (decoded) {
      College.findOne({
        where: {
          id: decoded.id,
        },
      }).then((college) => {
        if (!college) {
          res.status(400).send({
            message: "College does not exist!",
          });
        } else {
          res.send({
            college: college,
          });
        }
      });
    } else {
      res.status(400).send({
        message: "Invalid token!",
      });
    }
  }catch(err){
    res.status(400).send({
      message: "Invalid token!",
    });
  }
});

Router.post("/update_college", async (req, res) => {
  // check if college exists
  College.findOne({
    where: {
      id: req.body.college_id,
    },
  }).then((college) => {
    if (!college) {
      res.status(400).send({
        message: "College does not exist!",
      });
    } else {
      // update college
      let college;
      college = {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        district: req.body.district,
        state: req.body.state,
        pincode: req.body.pincode,
      };

      College.update(college, {
        where: {
          id: req.body.college_id,
        },
      })
        .then((data) => {
          res.send({
            message: "College updated successfully!",
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Some error occurred while updating college.",
          });
        });
    }
  });
});

module.exports = Router;
