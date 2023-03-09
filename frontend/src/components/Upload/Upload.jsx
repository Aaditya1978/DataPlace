import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import NavBar from "../NavBar/NavBar";
import upload_head_image from "../../images/upload_1.png";
import "./Upload.scss";

export default function Upload() {
  const navigate = useNavigate();

  const [college, setCollege] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    district: "",
    state: "",
    pincode: "",
  });

  const [validated, setValidated] = useState(false);

  const [placementData, setPlacementData] = useState([
    {
      year: "",
      branch: "",
      students: "",
      eligible_students: "",
      pnr: "",
      placed: "",
      offer_letters: "",
      lowest_package: "",
      highest_package: "",
      average_package: "",
      companies_visited: "",
    },
  ]);

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    setValidated(true);
    setSubmitting(true);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/placement/add_data`, {
        email: college.email,
        data: placementData,
      })
      .then((res) => {
        setSubmitting(false);
        alert(res.data.message);
      })
      .catch((err) => {
        setSubmitting(false);
        alert(err.response.data.message);
      });
  };

	const handleOnChange = (e, index) => {
		const { name, value } = e.target;
		const list = [...placementData];
		list[index][name] = value;
		setPlacementData(list);
	};

  const checkValidity = (value) => {
    if(value === "") return true;
    let val = parseInt(value);
    if(val < 0) return true;
    return false;
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

  return (
    <div className="upload">
      {/* Navbar */}
      <NavBar />

      {/* header section */}
      <Container className="u-header">
        <Row>
          <Col>
            <img
              src={upload_head_image}
              alt="upload header"
              className="u-head-img"
            />
          </Col>
          <Col className="u-head-text">
            <div>
              Welcome {college.name} <br />
              <span>
                Upload your college placement records and get valuable insights
              </span>
            </div>
          </Col>
        </Row>
      </Container>

      {/* main body */}
      <Container className="u-body">
        <div className="head">Upload Placements Records</div>
        <div className="u-form">
        <Form noValidate validated={validated} onSubmit={handleSubmit} method="POST">
					<Table striped bordered hover responsive>
            <thead>
                <tr>
                  <th style={{width:"130px"}}>#</th>
                  <th style={{width:"180px"}}>Year</th>
                  <th style={{width:"180px"}}>Branch</th>
                  <th style={{width:"130px"}}>No. of Students</th>
                  <th style={{width:"130px"}}>No. of Eligible Students</th>
                  <th style={{width:"130px"}}>No. of Students with PNR</th>
                  <th style={{width:"130px"}}>No. of Placed Students</th>
                  <th style={{width:"130px"}}>No. of Offer Letters</th>
                  <th style={{width:"130px"}}>Lowest Package (In LPA)</th>
                  <th style={{width:"130px"}}>Highest Package (In LPA)</th>
                  <th style={{width:"130px"}}>Average Package (In LPA)</th>
                  <th style={{width:"130px"}}>No. of Companies</th>
                  <th style={{width:"130px"}}>Action</th>
                </tr>
              </thead>
							<tbody>
								{placementData.map((data, index) => (
									<tr key={index}>
										<td>{index + 1}</td>
										<td>
											<Form.Select
												required
												name="year"
												value={data.year}
												onChange={(e) => handleOnChange(e, index)}
												isInvalid={data.year === ""}
											>
												<option value="">Select</option>
                        {/* start from 2000 till current year */}
                        { [...Array(new Date().getFullYear() - 2000 + 1).keys()].map((year) => (
                          <option value={2000 + year}>{2000 + year}</option>
                        ))}
											</Form.Select>
										</td>
                    <td>
                      <Form.Select
                        required
                        name="branch"
                        value={data.branch}
                        onChange={(e) => handleOnChange(e, index)}
                        isInvalid={data.branch === ""}
                      >
                        <option value="">Select</option>
                        <option value="CSE">CSE</option>
                        <option value="IT">IT</option>
                        <option value="ME">ME</option>
                        <option value="ECE">ECE</option>
                        <option value="EEE">EEE</option>
                        <option value="CIVIL">CIVIL</option>
                        <option value="BCA">BCA</option>
                        <option value="BBA">BBA</option>
                        <option value="MBA">MBA</option>
                        <option value="MCA">MCA</option>
                      </Form.Select>
                    </td>
                    <td>
                      <Form.Control
                        required
                        type="number"
                        name="students"
                        value={data.students}
                        onChange={(e) => handleOnChange(e, index)}
                        isInvalid={checkValidity(data.students)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        required
                        type="number"
                        name="eligible_students"
                        value={data.eligible_students}
                        onChange={(e) => handleOnChange(e, index)}
                        isInvalid={checkValidity(data.eligible_students)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        required
                        type="number"
                        name="pnr"
                        value={data.pnr}
                        onChange={(e) => handleOnChange(e, index)}
                        isInvalid={checkValidity(data.pnr)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        required
                        type="number"
                        name="placed"
                        value={data.placed}
                        onChange={(e) => handleOnChange(e, index)}
                        isInvalid={checkValidity(data.placed)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        required
                        type="number"
                        name="offer_letters"
                        value={data.offer_letters}
                        onChange={(e) => handleOnChange(e, index)}
                        isInvalid={checkValidity(data.offer_letters)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        required
                        type="number"
                        name="lowest_package"
                        value={data.lowest_package}
                        onChange={(e) => handleOnChange(e, index)}
                        isInvalid={checkValidity(data.lowest_package)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        required
                        type="number"
                        name="highest_package"
                        value={data.highest_package}
                        onChange={(e) => handleOnChange(e, index)}
                        isInvalid={checkValidity(data.highest_package)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        required
                        type="number"
                        name="average_package"
                        value={data.average_package}
                        onChange={(e) => handleOnChange(e, index)}
                        isInvalid={checkValidity(data.average_package)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        required
                        type="number"
                        name="companies_visited"
                        value={data.companies_visited}
                        onChange={(e) => handleOnChange(e, index)}
                        isInvalid={checkValidity(data.companies_visited)}
                      />
                    </td>
                    <td>
                    <AiTwotoneDelete
                      className="u-del-ico"
                      onClick={() => {
                        const list = [...placementData];
                        list.splice(index, 1);
                        setPlacementData(list);
                      }}
                    />
                    </td>
									</tr>
								))}
							</tbody>
						</Table>
            <br />
            <Button
                  variant="outline-success"
                  onClick={() => {
                    setPlacementData([
                      ...placementData,
                      {
                        year: "",
                        branch: "",
                        students: "",
                        eligible_students: "",
                        pnr: "",
                        placed: "",
                        offer_letters: "",
                        lowest_package: "",
                        highest_package: "",
                        average_package: "",
                        companies_visited: "",
                      },
                    ]);
                  }}
                >
                  <FaPlus /> Add More Records
                </Button>
                <br />
                <div className="u-sub">
              {!submitting ? (
                <Button className="u-sub-b" type="submit">
                  Submit Records
                </Button>
              ) : (
                <Button className="u-sub-b" type="submit" disabled>
                  Submitting...
                </Button>
              )}
            </div>
            </Form>
          {/* <Form noValidate validated={validated} onSubmit={handleSubmit} method="POST">
            {placementData.map((data, index) => (
              <div key={index}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>Select Placement Record Year</Form.Label>
                    <Form.Select
                      required
                      name="year"
                      value={data.year}
                      onChange={(e) => {
                        const list = [...placementData];
                        list[index][e.target.name] = e.target.value;
                        setPlacementData(list);
                      }}
                      isInvalid={data.year === ""}
                    >
                      <option value="">Select</option>
                      <option value="2019">2019</option>
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please select a year.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Select Branch / Specialization</Form.Label>
                    <Form.Select
                      required
                      name="branch"
                      value={data.branch}
                      onChange={(e) => {
                        const list = [...placementData];
                        list[index][e.target.name] = e.target.value;
                        setPlacementData(list);
                      }}
                      isInvalid={data.branch === ""}
                    >
                      <option value="">Select</option>
                      <option value="CSE">CSE</option>
                      <option value="IT">IT</option>
                      <option value="ME">ME</option>
                      <option value="BBA">BBA</option>
                      <option value="BCA">BCA</option>
                      <option value="MCA">MCA</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please select a branch.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom03">
                    <Form.Label>Enter Total Number of Students</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="No. of Students"
                      value={data.students}
                      name="students"
                      onChange={(e) => {
                        const list = [...placementData];
                        list[index][e.target.name] = e.target.value;
                        setPlacementData(list);
                      }}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid number.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustom04">
                    <Form.Label>Enter Number of Eligible Students</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="No. of Eligible Students"
                      value={data.eligible_students}
                      name="eligible_students"
                      onChange={(e) => {
                        const list = [...placementData];
                        list[index][e.target.name] = e.target.value;
                        setPlacementData(list);
                      }}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid number.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="4" controlId="validationCustom03">
                    <Form.Label>
                      Students with Placement Not Required (PNR)
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="PNR Students"
                      value={data.pnr}
                      name="pnr"
                      onChange={(e) => {
                        const list = [...placementData];
                        list[index][e.target.name] = e.target.value;
                        setPlacementData(list);
                      }}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid number.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationCustom04">
                    <Form.Label>Number of Students Placed</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="No. of placed Students"
                      value={data.placed}
                      name="placed"
                      onChange={(e) => {
                        const list = [...placementData];
                        list[index][e.target.name] = e.target.value;
                        setPlacementData(list);
                      }}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid number.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationCustom04">
                    <Form.Label>Enter Number of Offer Letters</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="No. of Offer Letters"
                      value={data.offer_letters}
                      name="offer_letters"
                      onChange={(e) => {
                        const list = [...placementData];
                        list[index][e.target.name] = e.target.value;
                        setPlacementData(list);
                      }}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid number.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="4" controlId="validationCustom03">
                    <Form.Label>Lowest Package (in LPA)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="lowest package"
                      value={data.lowest_package}
                      name="lowest_package"
                      onChange={(e) => {
                        const list = [...placementData];
                        list[index][e.target.name] = e.target.value;
                        setPlacementData(list);
                      }}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid number.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationCustom04">
                    <Form.Label>Highest Package (in LPA)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="highest package"
                      value={data.highest_package}
                      name="highest_package"
                      onChange={(e) => {
                        const list = [...placementData];
                        list[index][e.target.name] = e.target.value;
                        setPlacementData(list);
                      }}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid number.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="validationCustom04">
                    <Form.Label>Average Package (in LPA)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="average package"
                      value={data.average_package}
                      name="average_package"
                      onChange={(e) => {
                        const list = [...placementData];
                        list[index][e.target.name] = e.target.value;
                        setPlacementData(list);
                      }}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid number.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom03">
                    <Form.Label>
                      Total Number of Companies Visiting Campus{" "}
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="no. of companies"
                      value={data.companies_visited}
                      name="companies_visited"
                      onChange={(e) => {
                        const list = [...placementData];
                        list[index][e.target.name] = e.target.value;
                        setPlacementData(list);
                      }}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid number.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Col md="3">
                    <AiTwotoneDelete
                      className="u-del-ico"
                      onClick={() => {
                        const list = [...placementData];
                        list.splice(index, 1);
                        setPlacementData(list);
                      }}
                    />
                  </Col>
                </Row>
                <br />
              </div>
            ))}
            <Row className="mb-3">
              <Col md="3">
                <Button
                  variant="outline-success"
                  onClick={() => {
                    setPlacementData([
                      ...placementData,
                      {
                        year: "",
                        eleigible_students: "",
                        pnr: "",
                        placed: "",
                        offer_letters: "",
                        lowest_package: "",
                        highest_package: "",
                        average_package: "",
                        companies: "",
                      },
                    ]);
                  }}
                >
                  <FaPlus /> Add More Records
                </Button>
              </Col>
            </Row>
            <div className="u-sub">
              {!submitting ? (
                <Button className="u-sub-b" type="submit">
                  Submit Records
                </Button>
              ) : (
                <Button className="u-sub-b" type="submit" disabled>
                  Submitting...
                </Button>
              )}
            </div>
          </Form> */}
        </div>
      </Container>
    </div>
  );
}
