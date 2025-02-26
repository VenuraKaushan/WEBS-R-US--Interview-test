
import React, { useState, useEffect } from "react";
import { useNavigate ,useLocation} from "react-router-dom";
import axios from "axios";
import '../App.css';


const SummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { boxes, totalPrice } = location.state;

  const handleBack = () => {
    // Navigate back to the Selection page with the current boxes data
    navigate("/", { state: { boxes } });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Summary</h2>
      <h3 className="text-lg font-semibold mb-4">Total Price: ${totalPrice}</h3>
      
      {/* Display the boxes and their details */}
      {boxes.map((box, index) => (
        <div key={index} className="border p-4 mb-2">
          <p>Box Type: {box.type}</p>
          <p>Quantity: {box.quantity}</p>
          {box.type === "Box C" && (
            <>
              <p>Length: {box.length} cm</p>
              <p>Width: {box.width} cm</p>
              <p>Height: {box.height} cm</p>
            </>
          )}
          {/* Show total price for each box */}
          <p>Total Price for this box: ${calculateTotalPrice(box)}</p>
        </div>
      ))}

      {/* Back Button */}
      <button
        onClick={handleBack}
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        Back
      </button>
    </div>
  );
};

// Helper function to calculate individual box price
const calculateTotalPrice = (box) => {
  const rate = 472.41; // Rate per cubic meter
  const deliveryCharge = 5; // Flat delivery charge

  let volume;

  if (box.type === "Box A") {
    volume = (42 * 42 * 60) / 1000000; // Fixed dimensions for Box A
  } else if (box.type === "Box B") {
    volume = (42 * 42 * 30) / 1000000; // Fixed dimensions for Box B
  } else if (box.type === "Box C") {
    volume = (box.length * box.width * box.height) / 1000000; // Custom dimensions for Box C
  }

  return (volume * box.quantity * rate + deliveryCharge).toFixed(7); // Return price with 7 decimal points
};

export default SummaryPage;

