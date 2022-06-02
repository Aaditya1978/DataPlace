import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import axios from "axios";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const [verified, setVerified] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("");
  const [userType, setUserType] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/signup");
    }
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/verify_token`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUserType(res.data.type);
        if (res.data.type === "gov") {
          setVerified(true);
          setVerificationStatus("Verified");
        }
        setVerified(res.data.data.verified);
        setVerificationStatus(res.data.data.verification_status);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        navigate("/signup");
      });
  }, []);

  return (
    <>
      {!verified && verificationStatus === "Pending" ? (
        <div className="dashboard">
          <Accordion defaultActiveKey="0">
            <Accordion.Item className="accitem" eventKey="0">
              <Accordion.Header>
                <span> Thank You For Registering!</span>
              </Accordion.Header>

              <Accordion.Body>
                <p>
                  {" "}
                  Please wait for sometime. Your registration is under the
                  process of verification. Once your form get verified then you
                  will be able to experience the DATAPLACE platform. <br />
                  Your form verification will be notified to you through your
                  registered e-mail/sms.
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <div className="cantainer">
            <h5>If you are the admin of this page</h5>
            <p>check out the docs</p>
            <h5>If you are the visitor of this page</h5>
            <p>wait a few minutes and refresh the page</p>
          </div>
        </div>
      ) : (
        <div className="dashboard-main">
          Hello {userType}
        </div>
      )}
    </>
  );
}
