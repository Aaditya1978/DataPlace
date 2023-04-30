import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Button, Form } from "react-bootstrap";
import axios from "axios";
import "./FeedbackForm.scss";

export default function FeedbackForm() {

  const params = useParams();

  const [form , setForm] = useState({
    collegeName: "",
    year: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    branch: "",
    email: "",
    alreadyPlaced: "",
    companyName: "",
    overallExperience: "",
    feedback: "",
  });


  useEffect(() => {
    axios
        .get(`${process.env.REACT_APP_BASE_URL}/api/feedback/get_feedback_form/${params.collegeId}/${params.year}`)
        .then((res) => {
            setForm(res.data.data);
        })
        .catch((err) => {
            alert(err.response.data.message);
        });
    }, [params.collegeId, params.year]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/feedback/create_feedback`, {
        collegeId: params.collegeId,
        year: params.year,
        data: formData,
      })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };


  return (
    <div className="feedbackform">
      <Container className="cont">
        <div className="header">
          <h1>Feedback Form</h1>

          <p>
            Please fill the form below to give us your feedback for the
            placement season.The feedback will be used to improve the placement
            season for the future. The data will be kept confidential and will
            not be shared with anyone.
            <br />
            This form is for the students of <span>{form.collegeName}</span> of Batch <span>{form.year}</span>.
          </p>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Roll Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your roll number"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Branch</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Already Placed?</Form.Label>
            <Form.Control
              as="select"
              name="alreadyPlaced"
              value={formData.alreadyPlaced}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the company name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Overall Experience</Form.Label>
            <Form.Control
              as="select"
              name="overallExperience"
              value={formData.overallExperience}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="average">Average</option>
              <option value="not satisfied">Not Satisfied</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Feedback for Placement Cell</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}
