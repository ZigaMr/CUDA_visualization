// import React, { useState } from 'react';
import AlgorithmForm from '../components/AlgorithmForm';
// import AlgorithmResults from '../components/AlgorithmResults';
// import axios from 'axios';

const Dashboard = () => {

  return (
    <div className="dashboard-container">
      <h2>Algorithm Comparison Dashboard</h2>
      <div className="form-results-container">
        <AlgorithmForm/>
      </div>
    </div>
  );
};

export default Dashboard;
