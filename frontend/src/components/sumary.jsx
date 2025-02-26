
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import '../App.css';



const Summary = ({ boxes }) => {
  const navigate = useNavigate();
  const total = boxes.reduce((sum, box) => sum + box.quantity * 50, 5); // Example calculation

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Step 2: Summary</h2>
      <p>Total Price: ${total.toFixed(2)}</p>
      <button onClick={() => navigate("/")} className="mt-4 bg-gray-500 text-white p-2 rounded">Back</button>
    </div>
  );
};

export default Summary;