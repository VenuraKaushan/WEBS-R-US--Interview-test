import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SelectionPage = ({ boxes, setBoxes }) => {
  const navigate = useNavigate();

  const boxTypes = ["Box A", "Box B", "Box C"];

  const handleBoxChange = (index, field, value) => {
    const updatedBoxes = [...boxes];

    // Ensure quantity is at least 1
    if (field === "quantity") {
      value = Math.max(1, parseInt(value) || 1);
    }

    // If the user selects a type other than Box C, reset dimensions
    if (field === "type" && value !== "Box C") {
      updatedBoxes[index] = {
        type: value,
        quantity: 1,
        length: "",
        width: "",
        height: "",
      };
    } else {
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

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Step 1: Select Boxes</h2>

      {boxes.map((box, index) => (
        <div key={index} className="p-4 border rounded mt-4">
          {/* Dropdown for selecting Box Type */}
          <label className="block font-semibold">Select Box Type</label>
          <select
            className="border p-2 w-full mt-1"
            value={box.type}
            onChange={(e) => handleBoxChange(index, "type", e.target.value)}
          >
            <option value="">Select Box Type</option>
            {boxTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {/* Show dimension inputs only if Box C is selected */}
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

          {/* Quantity Input */}
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

      {/* Buttons for Adding and Navigating */}
      <button
        onClick={addAnotherBox}
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        Add Another
      </button>
      <button
        onClick={() => navigate("/summary")}
        className="mt-4 ml-2 bg-green-500 text-white p-2 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default SelectionPage;
