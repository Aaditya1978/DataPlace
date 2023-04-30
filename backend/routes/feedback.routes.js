const express = require("express");
const Router = express.Router();
const db = require("../models/db");
const College = db.college;
const Feedback = db.feedback;
const FeedbackForm = db.feedbackForm;

// create feedback form
Router.post("/create_feedback_form", async (req, res) => {
    if (!req.body.email || !req.body.collegeName || !req.body.year) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    const college = await College.findOne({ where: { email: req.body.email } });

    if (!college) {
        res.status(404).send({
            message: "College not found"
        });
        return;
    }

    const feedbackForm = await FeedbackForm.findOne({ where: { collegeID: college.id, year: req.body.year } });

    if (feedbackForm) {
        res.status(400).send({
            message: "Feedback form already exists"
        });
        return;
    }

    const link = "http://localhost:3000/feedback_form/" + college.id + "/" + req.body.year;

    const newFeedbackForm = {
        collegeID: college.id,
        collegeName: req.body.collegeName,
        year: req.body.year,
        link: link,
        createdAt: new Date(),
    };

    FeedbackForm.create(newFeedbackForm)
        .then(data => {
            res.send({
                link: link
            });
        }
        ).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the feedback form."
            });
        });
});


// get feedback forms
Router.get("/get_feedback_forms/:email", async (req, res) => {

    const collegeEmail = req.params.email;

    const college = await College.findOne({ where: { email: collegeEmail } });

    if (!college) {
        res.status(404).send({
            message: "College not found"
        });
        return;
    }

    FeedbackForm.findAll({ where: { collegeID: college.id } })
        .then(data => {
            res.send({ data: data });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving feedback forms."
            });
        });
});


// get feedback form
Router.get("/get_feedback_form/:collegeID/:year", async (req, res) => {
    const collegeID = req.params.collegeID;
    const year = req.params.year;

    const feedbackForm = await FeedbackForm.findOne({ where: { collegeID: collegeID, year: year } });

    if (!feedbackForm) {
        res.status(404).send({
            message: "Feedback form not found"
        });
        return;
    }

    res.send({ data: feedbackForm });
});

Router.delete("/delete_feedback_form/:formId", async (req, res) => {
    const formId = req.params.formId;
    const form = await FeedbackForm.findOne({ where: { id: formId } });

    if (!form) {
        res.status(404).send({
            message: "Feedback form not found"
        });
        return;
    }

    FeedbackForm.destroy({ where: { id: formId } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Feedback form was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Feedback form with id=${formId}. Maybe Feedback form was not found!`
                });
            }
        }
        ).catch(err => {
            res.status(500).send({
                message: "Could not delete Feedback form with id=" + formId
            });
        });
});


Router.post("/create_feedback", async (req, res) => {
    if (!req.body.collegeId || !req.body.year || !req.body.data) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
        return;
    }

    const collegeId = req.body.collegeId;

    const feedbackForm = await FeedbackForm.findOne({ where: { collegeID: collegeId, year: req.body.year } });

    if (!feedbackForm) {
        res.status(404).send({
            message: "Feedback form not found"
        });
        return;
    }

    const boolAlreadyPlaced = req.body.data.alreadyPlaced === "yes" ? true : false;

    const newFeedback = {
        formId: feedbackForm.id,
        name: req.body.data.name,
        rollNumber: req.body.data.rollNumber,
        branch: req.body.data.branch,
        email: req.body.data.email,
        alreadyPlaced: boolAlreadyPlaced,
        companyName: req.body.data.companyName,
        overallExperience: req.body.data.overallExperience,
        feedback: req.body.data.feedback,
        createdAt: new Date(),
    };

    Feedback.create(newFeedback)
        .then(data => {
            res.send({
                message: "Feedback submitted successfully"
            });
        }
        ).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the feedback."
            });
        });
});

// get feedbacks
Router.get("/get_feedbacks/:formId", async (req, res) => {
    const formId = req.params.formId;

    const feedbackForm = await FeedbackForm.findOne({ where: { id: formId } });

    if (!feedbackForm) {
        res.status(404).send({
            message: "Feedback form not found"
        });
        return;
    }

    Feedback.findAll({ where: { formId: formId } })
        .then(data => {
            res.send({
                form: feedbackForm,
                data: data
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving feedbacks."
            });
        });
});


module.exports = Router;