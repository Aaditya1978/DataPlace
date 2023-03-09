// This file contains the function to get the chat question based on the type of data
function getChatQuestion(type, data){

    if(type === "placementPercent"){
        return `Given percentage placement data below, ${data} write areas to improve on in points from data and nothing extra text should be written`
    }

    else if(type === "averagePackage"){
        return `Given average package data below, ${data} write areas to improve on in points from data and nothing extra text should be written`
    }

    else if(type === "numberCompany"){
        return `Given number of companies visiting college data below, ${data} write areas to improve on in points from data and nothing extra text should be written`
    }

    else if(type === "ineligibleStudent"){
        return `Given number of ineligible students for college data below, ${data} write areas to improve on in points from data and nothing extra text should be written`
    }

    else if(type === "lowestHighestPackage"){
        return `Given lowest and highest package placement for college data below, ${data} write areas to improve on in points from data and nothing extra text should be written`
    }

    else if(type === "averageOffer"){
        return `Given average offere letter per student for college data below, ${data} write areas to improve on in points from data and nothing extra text should be written`
    }

    else return "";
}

module.exports = getChatQuestion;