import React, { useState } from 'react';
import SelectionPage from '../components/form';
import Summary from '../components/sumary';

const App = () => {
  const [boxes, setBoxes] = useState([
    { type: "", length: "", width: "", height: "", quantity: 1 } // Initialize with one box
  ]);
  const [step, setStep] = useState(1);

  return (
    <div className="container mx-auto p-4">
      {step === 1 && <SelectionPage boxes={boxes} setBoxes={setBoxes} setStep={setStep} />}
      {step === 2 && <Summary boxes={boxes} setStep={setStep} />}
    </div>
  );
};

export default App;
