import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { Accordion } from "react-bootstrap";

export default function Dashboard() {
    return (
        <div className="dashboard">
            <Accordion  defaultActiveKey="0">
                <Accordion.Item className="accitem" eventKey="0">
                    <Accordion.Header>
                        <span > Thank You For Registering!</span>
                    </Accordion.Header>

                    <Accordion.Body>
                        <p> Please wait for sometime.
                            Your registration is under the process of verification. Once your form get verified then you will be able to experience the DATAPLACE platform. <br />
                            Your form verification will be notified to you through your registered e-mail/sms.
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


    );
}