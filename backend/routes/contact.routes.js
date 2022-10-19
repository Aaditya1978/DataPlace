const express = require("express");
const Router = express.Router();
const db = require("../models/db");
const Contact = db.contact;
const College = db.college;
const Admin = db.admin;

// create contact
Router.post("/create", (req, res) => {
  // validate request
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.query ||
    !req.body.college_id
  ) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  } else {
    // create contact
    const contact = {
      college_id: req.body.college_id,
      name: req.body.name,
      email: req.body.email,
      query: req.body.query,
      status: "pending",
      date: new Date(),
    };
    // save contact in the database
    Contact.create(contact)
      .then((data) => {
        Contact.findOne({
          where: {
            id: data.id,
          },
        }).then((result) => {
          res.status(200).send({
            message: "Contact created successfully!",
            data: result,
          });
        });
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Some error occurred while creating the query." });
      });
  }
});

// get all contacts
Router.get("/get_all", (req, res) => {
  Contact.findAll()
    .then((data) => {
      res.status(200).send({
        message: "Contacts fetched successfully!",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some error occurred while fetching contacts.",
      });
    });
});

// get all contacts by college id
Router.get("/get_all/:id", (req, res) => {
  Contact.findAll({
    where: {
      college_id: req.params.id,
    }
  })
    .then((data) => {
      res.status(200).send({
        message: "Contacts fetched successfully!",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Some error occurred while fetching contacts.",
      });
    });
});

// update response for contact
Router.put("/update_response", (req, res) => {
  Contact.update(
    {
      response: req.body.response,
      status: "replied",
      admin_id: req.body.admin_id,
      response_date: new Date(),
    },
    {
      where: {
        id: req.body.id,
      },
    }
  )
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "Contact updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Cannot update contact with id=${id}. Maybe contact was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating contact with id=" + id,
      });
    });
});

module.exports = Router;
