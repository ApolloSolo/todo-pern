
import React, { useEffect } from "react";
import Auth from "../utils/auth";

const Dashboard = () => {
  if (!Auth.loggedIn()) {
    window.location.assign("/");
  }
  return <div>Dashboard</div>;
};

export default Dashboard;