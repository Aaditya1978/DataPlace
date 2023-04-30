import React from "react";
import { BrowserRouter, Routes , Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Upload from "./components/Upload/Upload";
import Manage from "./components/Manage/Manage";
import Contact from "./components/Contact/Contact";
import Job from "./components/Job/Job";
import Feedback from "./components/Feedback/Feedback";
import FeedbackForm from "./components/FeedbackForm/FeedbackForm";
import FeedbackData from "./components/FeedbackData/FeedbackData";
import Profile from "./components/Profile/Profile";
import About from "./components/About/About";

import AdminLogin from "./components/Admin/AdminLogin";
import AdminDash from "./components/Admin/AdminDash";
import AdminManage from "./components/Admin/AdminManage";
import AdminManageState from "./components/Admin/AdminManageState";
import AdminManagePlacement from "./components/Admin/AdminManagePlacement";
import AdminQuery from "./components/Admin/AdminQuery";

function App() {
  return (
    <div>
       <BrowserRouter>
        <Routes>

          {/* college routes */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/upload" element={<Upload />} />
          <Route exact path="/manage" element={<Manage />} />
          <Route exact path="/job" element={<Job />} />
          <Route exact path="/feedback" element={<Feedback />} />
          <Route exact path="/feedback_form/:collegeId/:year" element={<FeedbackForm />} />
          <Route exact path="/feedback_data/:formId" element={<FeedbackData />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/about" element={<About />} />

          {/* Admin routes */}
          <Route exact path="/dataplace_admin/login" element={<AdminLogin />} />
          <Route exact path="/dataplace_admin/dashboard" element={<AdminDash />} />
          <Route exact path="/dataplace_admin/manage" element={<AdminManage />} />
          <Route exact path="/dataplace_admin/manage/:state" element={<AdminManageState />} />
          <Route exact path="/dataplace_admin/manage/:state/:college" element={<AdminManagePlacement />} />
          <Route exact path="/dataplace_admin/query" element={<AdminQuery />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
