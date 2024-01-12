import { useState } from "react";

import "./Spinner.css";

const SpinnerComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState("");

  const startSpinner = () => {
    if (name.trim() !== "" && isValidEmail(email)) {
      setIsSpinning(true);
      // Simulate a delay for spinner effect
      setTimeout(() => {
        const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
        const randomIndex = Math.floor(Math.random() * options.length);
        setResult(options[randomIndex]);
        setIsSpinning(false);
      }, 2000); // Adjust the delay as needed
    }
  };

  const isValidEmail = (email) => {
    // Simple email validation (you can replace it with a more robust validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Email:</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={startSpinner}>Start Spinner</button>

      <div className="spinner-container">
        {isSpinning && <div className="spinner"></div>}
      </div>

      {result && <p>Result: {result}</p>}
    </div>
  );
};

export default SpinnerComponent;
