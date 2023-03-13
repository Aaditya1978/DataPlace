const express = require("express");
const Router = express.Router();
const { getJobsList , release, config } = require("indeed-job-scraper");

config["max-pages"] = 4;

Router.get("/get_jobs/:query", async (req, res) => {
    let query;
    if(req.params.query === "all") {
        query = "software engineer,analyst,developer,consultant,designer";
    } else {
        query = req.params.query;
    }
    getJobsList({
        query: query,
        level: "entry_level",
        sort: "date",
        maxperpage: 10,
    }).then((jobs) => {
        res.status(200).send({ jobData: jobs });
    })
    .catch((err) => {
        res.status(500).send({ message: err.message });
    });
});

module.exports = Router;