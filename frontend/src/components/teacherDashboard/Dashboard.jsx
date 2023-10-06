// Dashboard.js
import React from "react";
import { Link } from "react-router-dom";
import CreateCourse from "./CreateCourse";
// import SignOut from "./SignOut";

function Dashboard() {
  return (
    <div>
      <h2>Teacher Dashboard</h2>
      <Link to="/create-course">Create Course</Link>
      
    </div>
  );
}

export default Dashboard;
