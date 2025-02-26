import { Routes, Route } from "react-router-dom";
import Summary from "./components/summary";
import SelectionPage from "./components/form";

const AllRoutes = ({ boxes, setBoxes, setStep }) => { 
  
  return (
    <Routes>
      <Route path="/" element={<SelectionPage boxes={boxes} setBoxes={setBoxes} setStep={setStep} />} />
      <Route path="/summary" element={<Summary/>} />
    </Routes>
  );
};

export default AllRoutes; 
