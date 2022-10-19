import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import AdminNav from "./AdminNav";
import AdminManageHeadImg from "../../images/admin_manage.png";
import { VectorMap } from "@react-jvectormap/core";
import { inMill } from "@react-jvectormap/india";
import { FcInfo } from "react-icons/fc";
import "./AdminManage.scss";

export default function AdminManage() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    name: "",
    email: "",
  });
  const [cardData, setCardData] = useState({
    no_of_colleges: 0,
    no_of_placements: 0,
    no_of_locations: 0,
  });

  const stateMapping = {
    "Andaman and Nicobar Islands": "IN-AN",
    "Andhra Pradesh": "IN-AP",
    "Arunachal Pradesh": "IN-AR",
    Assam: "IN-AS",
    Bihar: "IN-BR",
    Chandigarh: "IN-CH",
    Chhattisgarh: "IN-CT",
    "Dadra and Nagar Haveli": "IN-DN",
    "Daman and Diu": "IN-DD",
    Delhi: "IN-DL",
    Goa: "IN-GA",
    Gujarat: "IN-GJ",
    Haryana: "IN-HR",
    "Himachal Pradesh": "IN-HP",
    "Jammu and Kashmir": "IN-JK",
    Jharkhand: "IN-JH",
    Karnataka: "IN-KA",
    Kerala: "IN-KL",
    Ladakh: "IN-LA",
    Lakshadweep: "IN-LD",
    "Madhya Pradesh": "IN-MP",
    Maharashtra: "IN-MH",
    Manipur: "IN-MN",
    Meghalaya: "IN-ML",
    Mizoram: "IN-MZ",
    Nagaland: "IN-NL",
    Odisha: "IN-OR",
    Puducherry: "IN-PY",
    Punjab: "IN-PB",
    Rajasthan: "IN-RJ",
    Sikkim: "IN-SK",
    "Tamil Nadu": "IN-TN",
    Telangana: "IN-TG",
    Tripura: "IN-TR",
    Uttarakhand: "IN-UT",
    "Uttar Pradesh": "IN-UP",
    "West Bengal": "IN-WB",
  };

  const reverseStateMapping = {
    "IN-AN": "Andaman and Nicobar Islands",
    "IN-AP": "Andhra Pradesh",
    "IN-AR": "Arunachal Pradesh",
    "IN-AS": "Assam",
    "IN-BR": "Bihar",
    "IN-CH": "Chandigarh",
    "IN-CT": "Chhattisgarh",
    "IN-DN": "Dadra and Nagar Haveli",
    "IN-DD": "Daman and Diu",
    "IN-DL": "Delhi",
    "IN-GA": "Goa",
    "IN-GJ": "Gujarat",
    "IN-HR": "Haryana",
    "IN-HP": "Himachal Pradesh",
    "IN-JK": "Jammu and Kashmir",
    "IN-JH": "Jharkhand",
    "IN-KA": "Karnataka",
    "IN-KL": "Kerala",
    "IN-LA": "Ladakh",
    "IN-LD": "Lakshadweep",
    "IN-MP": "Madhya Pradesh",
    "IN-MH": "Maharashtra",
    "IN-MN": "Manipur",
    "IN-ML": "Meghalaya",
    "IN-MZ": "Mizoram",
    "IN-NL": "Nagaland",
    "IN-OR": "Odisha",
    "IN-PY": "Puducherry",
    "IN-PB": "Punjab",
    "IN-RJ": "Rajasthan",
    "IN-SK": "Sikkim",
    "IN-TN": "Tamil Nadu",
    "IN-TG": "Telangana",
    "IN-TR": "Tripura",
    "IN-UT": "Uttarakhand",
    "IN-UP": "Uttar Pradesh",
    "IN-WB": "West Bengal",
  };

  const [mapData, setMapData] = useState({});
  const [mapData2, setMapData2] = useState([]);
  let mapData3 = {};

  useEffect(() => {
    if (localStorage.getItem("admin_token") === null) {
      navigate("/dataplace_admin/login");
    }
    axios
      .get(
        `${
          process.env.REACT_APP_BASE_URL
        }/api/admin/get_admin/${localStorage.getItem("admin_token")}`
      )
      .then((res) => {
        setAdmin(res.data.admin);
        axios
          .get(`${process.env.REACT_APP_BASE_URL}/api/admin/manageData`)
          .then((res) => {
            setCardData(res.data.card_data);
            setMapData(res.data.state_wise_data);
            setMapData2(res.data.state_wise_data2);
            mapData3 = res.data.state_wise_data;
          });
      })
      .catch((err) => {
        alert(err.response.data.message);
        localStorage.removeItem("admin_token");
        navigate("/dataplace_admin/login");
      });
  }, [navigate]);

  const handleRegionClick = (event,data) => {
    setTimeout(()=> { Array.from(document.getElementsByClassName("jvectormap-tip")).forEach((el) => { el.style.display = 'none' }); },100);
    navigate(`/dataplace_admin/manage/${reverseStateMapping[data]}`);
  }

  return (
    <div className="admanage">
      {/* Admin NavBar */}
      <AdminNav />

      {/* header section */}
      <Container className="adm-header">
        <Row>
          <Col>
            <img
              src={AdminManageHeadImg}
              alt="Admin Manage header"
              className="adm-head-img"
            />
          </Col>
          <Col className="adm-head-text">
            <div>
              Welcome {admin.name} <br />
              <span>
                Manage various college details and other admin related
                information.
              </span>
            </div>
          </Col>
        </Row>
      </Container>

      {/* main body */}
      <Container className="adm-body">
        {/* cards row */}
        <Row>
          <div className="adm-head">DataPlace Stats</div>
          <Col md={4}>
            <Card className="adm-card">
              <Card.Body>
                <Card.Title>Colleges Registered</Card.Title>
                <Card.Text>
                  {cardData.no_of_colleges} colleges have registered with
                  DataPlace.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="adm-card">
              <Card.Body>
                <Card.Title>Placement Data</Card.Title>
                <Card.Text>
                  {cardData.no_of_placements}+ placement data has been
                  collected.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="adm-card">
              <Card.Body>
                <Card.Title>Locations</Card.Title>
                <Card.Text>
                  {cardData.no_of_locations}+ locations have been covered.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* map section */}
        <div className="adm-map">
          <div className="adm-head">Colleges Registered</div>
          <div className="adm-map-info">
            <FcInfo /> {" "} Click on a state to view stats in that state.
          </div>
          <VectorMap
            map={inMill}
            className="adm-map-main"
            zoomOnScroll={false}
            backgroundColor="#5b83da"
            labels={{
              regions: {
                render: function (code) {
                  return code.split("-")[1];
                },
                offsets: function (code) {
                  return [0, 0];
                },
              },
            }}
            series={{
              regions: [
                {
                  scale: ["#b7ffd8", "#10451d"],
                  values: {
                    ...mapData2.reduce((acc, cur) => {
                      acc[stateMapping[cur.state]] = cur.count;
                      return acc;
                    }, {}),
                  },
                  legend: {
                    vertical: true,
                  },
                  min: 0,
                  max: 200,
                  attribute: "fill",
                },
              ],
            }}
            onRegionTipShow={(e, el, code) => {
              if(mapData3[reverseStateMapping[code]]){
                el.html(el.html() + `: ${mapData3[reverseStateMapping[code]]}`);
              }
              else{
                el.html(el.html() + `: 0`);
              }
            }}
            onRegionClick={handleRegionClick}
          />
        </div>
      </Container>
    </div>
  );
}
