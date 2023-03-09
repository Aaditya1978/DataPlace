const db = require("../models/db");
const Placement = db.placement;

// Function to get data for stats
const statData = async (collegeId) => {

    // find record with collegeId and highest_package is highest
    const highestPackage = await Placement.findOne({
        where: { college_id: collegeId },
        order: [["highest_package", "DESC"]],
        limit: 1,
    });
    
    // find record with collegeId and lowest_package is lowest
    const lowestPackage = await Placement.findOne({
        where: { college_id: collegeId },
        order: [["lowest_package", "ASC"]],
        limit: 1,
    });

    const placementData = await Placement.findAll({
        where: { college_id: collegeId },
    });

    // calculate placement percentage for each year and store in array
    const placementPercent = [];
    placementData.forEach((data) => {
        const year = data.year;
        const index = placementPercent.findIndex((item) => item.year === year);
        if (index === -1) {
            placementPercent.push({ 
                year: year,
                placed_students: data.placed_students,
                eligible_students: data.eligible_students,
            });
        }
        else{
            placementPercent[index].placed_students += data.placed_students;
            placementPercent[index].eligible_students += data.eligible_students;
        }
    });
    const maxPercent = { year: 0, percent: 0 }
    placementPercent.forEach((data) => {
        const percent = (data.placed_students / data.eligible_students) * 100;
        const roundedPercent = Math.round((percent + Number.EPSILON) * 100) / 100;
        if (percent > maxPercent.percent) {
            maxPercent.year = data.year;
            maxPercent.percent = roundedPercent;
        }
    });
    
    const statData = {
        highestPackage: highestPackage,
        lowestPackage: lowestPackage,
        maxPercent: maxPercent,
    };

    return statData;
}

module.exports = statData;