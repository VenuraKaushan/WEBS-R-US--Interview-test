import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import AllRoutes from "./routes";

const App = () => {
  const [step, setStep] = useState(1);

  const [boxes, setBoxes] = useState([
    { type: "", length: "", width: "", height: "", quantity: 1 } 
  ]);

  return <AllRoutes boxes={boxes} setBoxes={setBoxes} setStep={setStep} />;
};

export default App;
