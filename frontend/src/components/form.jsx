import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SelectionPage = ({ boxes, setBoxes }) => {
  const navigate = useNavigate();
  const boxTypes = ["Box A", "Box B", "Box C"];
  const [boxData, setBoxData] = useState([]);

  useEffect(() => {
    const fetchBoxData = async () => {
      try {
        const response = await fetch("http://localhost:6001/api/boxes");
        const data = await response.json();
        console.log(data);
        setBoxData(data);
      } catch (error) {
        console.error("Error fetching box data", error);
      }
    };

    fetchBoxData();
  }, []);

  const handleBoxChange = (index, field, value) => {
    const updatedBoxes = [...boxes];
  
    if (field === "quantity") {
      value = Math.max(1, parseInt(value) || 1); // Ensure quantity is at least 1
    }
  
    if (field === "type" && value !== "Box C") {
      const selectedBox = boxData.find((box) => box.name === value);
      if (selectedBox) {
        updatedBoxes[index] = {
          type: value,
          quantity: 1,
          length: selectedBox.length,
          width: selectedBox.width,
          height: selectedBox.height,
        };
      } else {
        updatedBoxes[index] = { ...updatedBoxes[index], type: value };
      }
    } else {
      if (["length", "width", "height"].includes(field)) {
        value = Math.max(1, parseInt(value) || 1); 
      }
      updatedBoxes[index][field] = value;
    }
  
    setBoxes(updatedBoxes);
  };
  

  const addAnotherBox = () => {
    setBoxes([
      ...boxes,
      { type: "", length: "", width: "", height: "", quantity: 1 },
    ]);
  };

  const removeBox = (index) => {
    if (boxes.length > 1) {
      const updatedBoxes = boxes.filter((_, i) => i !== index);
      setBoxes(updatedBoxes);
    }
  };

  const calculateTotalPrice = (box) => {
    const rate = 472.41;
    const deliveryCharge = 5;

    let volume;

    if (box.type === "Box A") {
      volume = (box.width * box.length * box.height) / 1000000; // Fixed dimensions for Box A
    } else if (box.type === "Box B") {

      volume = (box.width * box.length * box.height) / 1000000; // Fixed dimensions for Box B
    } else if (box.type === "Box C") {
      console.log(box);

      volume = (box.length * box.width * box.height) / 1000000; // Custom dimensions for Box C
    }

    return (volume * box.quantity * rate + deliveryCharge).toFixed(7); // Return price with 7 decimal points
  };

  const calculateTotal = () => {
    return boxes
      .reduce((total, box) => {
        return total + parseFloat(calculateTotalPrice(box));
      }, 0)
      .toFixed(7); // Calculate and round the total price
  };

  const goToSummary = () => {
    const totalPrice = calculateTotal(); // Calculate the total price for all boxes
    navigate("/summary", { state: { boxes, totalPrice } });
  };

  const allBoxesHaveType = boxes.every((box) => box.type !== "");

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Step 1: Select Boxes</h2>

      {boxes.map((box, index) => (
        <div key={index} className="p-4 border rounded mt-4 relative">
          {boxes.length > 1 && (
            <button
              onClick={() => removeBox(index)}
              className="absolute top-2 right-2 text-red-500 text-xs w-6 h-6 p-0 flex items-center justify-center border border-transparent rounded-full"
            >
              ❌
            </button>
          )}

          <label className="block font-semibold">Select Box Type</label>
          <select
            className="border p-2 w-full mt-1 bg-white text-gray-800 border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={box.type}
            onChange={(e) => handleBoxChange(index, "type", e.target.value)}
          >
            <option value="" className="text-gray-500">
              Select Box Type
            </option>
            {boxTypes.map((type) => (
              <option key={type} value={type} className="text-black">
                {type}
              </option>
            ))}
          </select>

          {box.type === "Box C" && (
            <>
              <label className="block font-semibold mt-2">Length (cm)</label>
              <input
                type="number"
                className="border p-2 w-full"
                placeholder="Enter length"
                value={box.length}
                onChange={(e) =>
                  handleBoxChange(index, "length", e.target.value)
                }
              />

              <label className="block font-semibold mt-2">Width (cm)</label>
              <input
                type="number"
                className="border p-2 w-full"
                placeholder="Enter width"
                value={box.width}
                onChange={(e) =>
                  handleBoxChange(index, "width", e.target.value)
                }
              />

              <label className="block font-semibold mt-2">Height (cm)</label>
              <input
                type="number"
                className="border p-2 w-full"
                placeholder="Enter height"
                value={box.height}
                onChange={(e) =>
                  handleBoxChange(index, "height", e.target.value)
                }
              />
            </>
          )}

          <label className="block font-semibold mt-2">Quantity</label>
          <input
            type="number"
            className="border p-2 w-full"
            placeholder="Quantity"
            value={box.quantity}
            onChange={(e) => handleBoxChange(index, "quantity", e.target.value)}
          />
        </div>
      ))}

      <button
        onClick={addAnotherBox}
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        Add Another
      </button>
      <button
        onClick={goToSummary}
        disabled={
          !allBoxesHaveType ||
          boxes.some(
            (box) =>
              box.type === "Box C" && (!box.length || !box.width || !box.height)
          )
        } // Disable if any Box C has missing dimensions or if any box type is not selected
        className={`mt-4 ml-2 p-2 rounded ${
          allBoxesHaveType &&
          !boxes.some(
            (box) =>
              box.type === "Box C" && (!box.length || !box.width || !box.height)
          )
            ? "bg-green-500 text-white"
            : "bg-gray-400 text-gray-700 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default SelectionPage;
