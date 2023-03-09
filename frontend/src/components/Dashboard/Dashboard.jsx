import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, PolarArea } from "react-chartjs-2";
import { Button, Form, Card } from "react-bootstrap";
import { InfinitySpin } from "react-loader-spinner";
import { DiGoogleAnalytics } from "react-icons/di";
import NavBar from "../NavBar/NavBar";
import DashModal from "../DashModal/DashModal";
import "./Dashboard.scss";

export default function Dashboard() {
  const navigate = useNavigate();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    RadialLinearScale,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );

  const [loading, setLoading] = useState(true);
  const [college, setCollege] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    district: "",
    state: "",
    pincode: "",
  });
  const [placementPercentData, setPlacementPercentData] = useState({});
  const [averagePackageData, setAveragePackageData] = useState({});
  const [numberCompanyData, setNumberCompanyData] = useState({});
  const [ineligibleStudentData, setIneligibleStudentData] = useState({});
  const [lowestHighestPackageData, setLowestHighestPackageData] = useState({});
  const [lowestHighestPackageYear, setLowestHighestPackageYear] = useState(0);
  const [averageOfferData, setAverageOfferData] = useState({});
  const [averageOfferYear, setAverageOfferYear] = useState(0);
  const [statData, setStatData] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalBody, setModalBody] = useState("");

  const getAnalytics = (type, data) => {
    const stringData = JSON.stringify(data);
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/placementData/analytics/${type}/${stringData}`)
      .then((res) => {
        if (type === "placementPercent") {
          setModalBody(res.data.response);
        }
        else if (type === "averagePackage") {
          setModalBody(res.data.response);
        }
        else if (type === "numberCompany") {
          setModalBody(res.data.response);
        }
        else if (type === "ineligibleStudent") {
          setModalBody(res.data.response);
        }
        else if (type === "lowestHighestPackage") {
          setModalBody(res.data.response);
        }
        else if (type === "averageOffer") {
          setModalBody(res.data.response);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }


  const handleModalShow = (type) => {
    setModalShow(true);
    setModalBody(<InfinitySpin width='200' color="#0087ca"/>)
    if(type === "placementPercent"){
      setModalTitle("Placement Percentage Analysis");
      getAnalytics("placementPercent", placementPercentData.sortedData);
    }

    else if(type === "averagePackage"){
      setModalTitle("Average Package Analysis");
      getAnalytics("averagePackage", averagePackageData.sortedData);
    }

    else if(type === "numberCompany"){
      setModalTitle("Number of Companies Analysis");
      getAnalytics("numberCompany", numberCompanyData.sortedData);
    }

    else if(type === "ineligibleStudent"){
      setModalTitle("Ineligible Students Analysis");
      getAnalytics("ineligibleStudent", ineligibleStudentData.sortedData);
    }

    else if(type === "lowestHighestPackage"){
      setModalTitle("Lowest and Highest Package Analysis");
      getAnalytics("lowestHighestPackage", lowestHighestPackageData.sortedData);
    }

    else if(type === "averageOffer"){
      setModalTitle("Average Offer Letter per Student Analysis");
      getAnalytics("averageOffer", averageOfferData.sortedData);
    }
  }


  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/signup");
    }
    axios
      .get(
        `${
          process.env.REACT_APP_BASE_URL
        }/api/college/get_college/${localStorage.getItem("token")}`
      )
      .then((res) => {
        setCollege(res.data.college);
      })
      .catch((err) => {
        alert(err.response.data.message);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  useEffect(() => {
    if (college.id === undefined) return;
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/placementData/placementDatas/${college.id}`
      )
      .then((res) => {
        setPlacementPercentData(res.data.placementPercentData);
        setAveragePackageData(res.data.averagePackageData);
        setNumberCompanyData(res.data.numberCompanyData);
        setIneligibleStudentData(res.data.ineligibleStudentData);
        setLowestHighestPackageData(res.data.lowestHighestPackageData);
        setAverageOfferData(res.data.averageOfferData);
        setStatData(res.data.statDataObj);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [college.id]);

  return loading ? (
    <div className="spinner">
      <InfinitySpin color="#0087ca" />
    </div>
  ) : (
    <div className="dashboard">
      {/* Navbar */}
      <NavBar />


      {/* Main Heading */}
      <div className="dashhead">{college.name}</div>


      {/* Stats Cards */}
      <div className="dashStats">

        <h2 className="d-sub-head">Some Stats</h2>

        <div className="dashCards">

          {/* card */}
          <Card className="dashCard">
            <Card.Body>
              <Card.Title>Highest Package</Card.Title>
              <Card.Text>
                Highest package offered by a company is <strong>{statData.highestPackage.highest_package}LPA</strong> in the year {statData.highestPackage.year} for {statData.highestPackage.branch}.
              </Card.Text>
            </Card.Body>
          </Card>

          {/* card */}
          <Card className="dashCard">
            <Card.Body>
              <Card.Title>Lowest Package</Card.Title>
              <Card.Text>
                Lowest package offered by a company is <strong>{statData.lowestPackage.lowest_package}LPA</strong> in the year {statData.lowestPackage.year} for {statData.lowestPackage.branch}.
              </Card.Text>
            </Card.Body>
          </Card>

          {/* card */}
          <Card className="dashCard">
            <Card.Body>
              <Card.Title>Placement Percentage</Card.Title>
              <Card.Text>
                Average placement percentage was <strong>{statData.maxPercent.percent}</strong> which was highest in the year {statData.maxPercent.year} out of all the years.
              </Card.Text>
            </Card.Body>
          </Card>

        </div>
      </div>


      {/* Div for all charts */}
      <div className="dash">

        {/* chart for placement percentage */}
        <div className="dashChart">
          <h2 className="chart-head">Placement Percentage</h2>
          <Button className="chart-button" onClick={() => handleModalShow("placementPercent")}>
            <DiGoogleAnalytics className="chart-b-icon" /> 
            <span>Show Analytics</span>
          </Button>
          <Bar
            data={{
              labels: placementPercentData.yearList,
              datasets: placementPercentData.percentData,
            }}
            options={{
              responsive: true,
              interaction: {
                mode: "index",
                intersect: false,
              },
              scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true,
                },
              },
            }}
          />
        </div>

        {/* chart for average package */}
        <div className="dashChart">
          <h2 className="chart-head">Average Package</h2>
          <Button className="chart-button" onClick={() => handleModalShow("averagePackage")}>
            <DiGoogleAnalytics className="chart-b-icon" /> 
            <span>Show Analytics</span>
          </Button>
          <Line
            data={{
              labels: averagePackageData.yearList,
              datasets: averagePackageData.averagePackageData,
            }}
            options={{
              responsive: true,
              fill: false,
              interaction: {
                intersect: false,
              },
              radius: 0,
            }}
          />
        </div>

        {/*  chart for number of companies */}
        <div className="dashChart">
          <h2 className="chart-head">Number of companies Visiting</h2>
          <Button className="chart-button" onClick={() => handleModalShow("numberCompany")}>
            <DiGoogleAnalytics className="chart-b-icon" /> 
            <span>Show Analytics</span>
          </Button>
          <Line
            data={{
              labels: numberCompanyData.yearList,
              datasets: numberCompanyData.numberCompanyData,
            }}
            options={{
              responsive: true,
              fill: false,
              interaction: {
                intersect: false,
              },
              radius: 0,
            }}
          />
        </div>

        {/* chart for ineligible students */}
        <div className="dashChart">
          <h2 className="chart-head">Ineligible Students Trend</h2>
          <Button className="chart-button" onClick={() => handleModalShow("ineligibleStudent")}>
            <DiGoogleAnalytics className="chart-b-icon" /> 
            <span>Show Analytics</span>
          </Button>
          <Bar
            data={{
              labels: ineligibleStudentData.yearList,
              datasets: ineligibleStudentData.ineligibleStudentData,
            }}
            options={{
              indexAxis: "y",
              responsive: true,
              interaction: {
                mode: "index",
                intersect: false,
              },
              scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true,
                },
              },
              plugins: {
                legend: {
                  position: "right",
                },
              },
            }}
          />
        </div>

        {/* chart for lowest higest package */}
        <div className="dashChart d-full-width">
          <h2 className="chart-head">Lowest and Highest Package Trend</h2>
          <div className="utili">
            <Button className="chart-button" onClick={() => handleModalShow("lowestHighestPackage")}>
              <DiGoogleAnalytics className="chart-b-icon" /> 
              <span>Show Analytics</span>
            </Button>
            <Form.Select className="ut-select" onChange={(e) => {setLowestHighestPackageYear(e.target.value)}}>
              {lowestHighestPackageData.yearList.map((year, index) => (
                lowestHighestPackageYear === year ? (
                  <option key={year} value={index} selected>{year}</option>
                ) : (
                  <option key={year} value={index}>{year}</option>
                )
              ))}
            </Form.Select>
          </div>
          <Bar
            data={{
              labels: lowestHighestPackageData.branchList,
              datasets: [
                  lowestHighestPackageData.lowestHighestPackageData[lowestHighestPackageYear].lowest_package_data,
                  lowestHighestPackageData.lowestHighestPackageData[lowestHighestPackageYear].highest_package_data
              ],
            }}
            options={{
              responsive: true,
              interaction: {
                mode: "index",
                intersect: false,
              },
              scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true,
                },
              },
            }}
          />
        </div>


        {/* chart for average offer */}
        <div className="dashChart d-full-width">
          <h2 className="chart-head">Average Offer Letter per Student</h2>
          <div className="utili">
            <Button className="chart-button" onClick={() => handleModalShow("averageOffer")}>
              <DiGoogleAnalytics className="chart-b-icon" /> 
              <span>Show Analytics</span>
            </Button>
            <Form.Select className="ut-select" onChange={(e) => {setAverageOfferYear(e.target.value)}}>
              {averageOfferData.yearList.map((year, index) => (
                averageOfferYear === year ? (
                  <option key={year} value={index} selected>{year}</option>
                ) : (
                  <option key={year} value={index}>{year}</option>
                )
              ))}
            </Form.Select>
          </div>
          <PolarArea
            data={{
              labels: averageOfferData.branchList,
              datasets: [averageOfferData.averageOfferData[averageOfferYear].average_offer_data],
            }}
            options={{
              responsive: true,
              scales: {
                r: {
                  pointLabels: {
                    display: true,
                    centerPointLabels: true,
                    font: {
                      size: 12,
                    },
                  },
                },
              },
            }}
          />
        </div>

        {/* modal for analytics */}
        <DashModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          title={modalTitle}
          body={modalBody}
        />

      </div>
    </div>
  );
}
