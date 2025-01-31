import React, { useState } from "react";

const RangeSliderNew = ({ min = 0, max = 10, step = 1, initialRange = [2, 5] }) => {
  const [range, setRange] = useState(initialRange);

  const handleChange = (e, index) => {
    let value = Number(e.target.value);
    const newRange = [...range];

    // Ensure left handle doesn't go beyond right
    if (index === 0 && value < range[1]) newRange[0] = value;
    
    // Ensure right handle doesn't go before left
    if (index === 1 && value > range[0]) newRange[1] = value;

    setRange(newRange);
  };

  const getPercentage = (value) => ((value - min) / (max - min)) * 100;

  return (
    <div style={{ width: "100%", maxWidth: "400px", padding: "20px" }}>
      <div style={{ position: "relative", height: "30px" }}>
        
        {/* Full Track */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "0",
            width: "100%",
            height: "6px",
            background: "#e0e0e0",
            borderRadius: "3px",
            transform: "translateY(-50%)",
          }}
        />
        
        {/* Active Range Track */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: `${getPercentage(range[0])}%`,
            width: `${getPercentage(range[1]) - getPercentage(range[0])}%`,
            height: "6px",
            background: "blue",
            borderRadius: "3px",
            transform: "translateY(-50%)",
          }}
        />
        
        {/* Input sliders (VISIBLE and overlapping) */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={range[0]}
          onChange={(e) => handleChange(e, 0)}
          style={{
            position: "absolute",
            top: "50%",
            width: "100%",
            opacity: 0,
            zIndex: 2,
            cursor: "pointer",
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={range[1]}
          onChange={(e) => handleChange(e, 1)}
          style={{
            position: "absolute",
            top: "50%",
            width: "100%",
            opacity: 0,
            zIndex: 2,
            cursor: "pointer",
          }}
        />
        
        {/* Knobs */}
        <div
          style={{
            position: "absolute",
            left: `${getPercentage(range[0])}%`,
            top: "50%",
            width: "14px",
            height: "14px",
            background: "white",
            border: "2px solid blue",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: `${getPercentage(range[1])}%`,
            top: "50%",
            width: "14px",
            height: "14px",
            background: "white",
            border: "2px solid blue",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
      
      {/* Dynamic Labels */}
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: "10px" }}>
        <span>{range[0]} Yrs</span>
        <span>{range[1]} Yrs</span>
      </div>
    </div>
  );
};

export default RangeSliderNew;
