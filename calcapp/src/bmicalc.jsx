import { useState } from "react";
import "./App.css";

const BMIForm = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState("");

  const calculateBMI = (e) => {
    e.preventDefault();

    if (weight && height) {
      const heightInMeters = height / 100; // Convert cm to meters
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiValue);

      // Determine the BMI category
      if (bmiValue < 18.5) setMessage("Underweight");
      else if (bmiValue < 24.9) setMessage("Normal weight");
      else if (bmiValue < 29.9) setMessage("Overweight");
      else setMessage("Obese");
    }
  };

  return (
    <div className="bmi-container">
      <h2>BMI Calculator</h2>
      <form onSubmit={calculateBMI}>

        <div className= "both-grid">
        <div className="input-group">
          <label>Weight (kg):</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
        </div>

        <div className="input-group">
          <label>Height (cm):</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} required />
        </div>
</div>
        <button className= "calc" type="submit">Calculate BMI</button>
      </form>
      {bmi && (
        <div className="result">
          <h3>Your BMI: {bmi}</h3>
          <p>Status: {message}</p>
        </div>
      )}
    </div>
  );
};

export default BMIForm;
