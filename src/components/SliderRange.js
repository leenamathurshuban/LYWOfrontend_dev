import React, { useState } from "react";

const RangeSliderNew = ({ range, setRange, minRange = 0, maxRange = 10, step = 1, initialRange = [2, 5] }) => {
  // const [range, setRange] = useState(initialRange);

  // const handleChange = (e, index) => {
  //   let value = Number(e.target.value);
  //   const newRange = [...range];

  //   // Ensure left handle doesn't go beyond right
  //   if (index === 0 && value < range[1]) newRange[0] = value;

  //   // Ensure right handle doesn't go before left
  //   if (index === 1 && value > range[0]) newRange[1] = value;

  //   setRange(newRange);
  // };
  // const [range, setRange] = useState({ min: 2, max: 5 });
  const getPercentage = (value) => ((value - minRange) / (maxRange - minRange)) * 100;




  const handleInputChange = (e, type) => {
    const value = Number(e.target.value);
    if (type === 'min' && value <= range.max) {
      setRange({ ...range, ["min"]: value });
    } else if (type === 'max' && value >= range.min) {
      setRange({ ...range, ["max"]: value });
    }
  };

  return (
    <>
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
              left: `${getPercentage(range.min)}%`,
              width: `${getPercentage(range.max) - getPercentage(range.min)}%`,
              height: "6px",
              background: "blue",
              borderRadius: "3px",
              transform: "translateY(-50%)",
            }}
          />

          {/* Input sliders (VISIBLE and overlapping) */}
          <input
            // type="range"
            // min={min}
            // max={max}
            step={step}
            // value={range[0]}
            // onChange={(e) => handleChange(e, 0)}
            type="range"
            min="0"
            max="10"
            value={range.min}
            onChange={(e) => handleInputChange(e, 'min')}
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
            // type="range"
            // min={min}
            // max={max}
            step={step}
            // value={range[1]}
            // onChange={(e) => handleChange(e, 1)}
            type="range"
            min="0"
            max="10"
            value={range.max}
            onChange={(e) => handleInputChange(e, 'max')}
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
              left: `${getPercentage(range.min)}%`,
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
              left: `${getPercentage(range.max)}%`,
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
          <span>{range.min} Yrs</span>
          <span>{range.max} Yrs</span>
        </div>
      </div>


      {/* <div className="experience-container">
        <h2>Experience</h2>
        <p>Ideal Years of Experience</p>

        <div className="inputs">
          <select disabled>
            <option>Range</option>
          </select>
          <input
            type="number"
            min="0"
            max="10"
            value={range.min}
            onChange={(e) => handleInputChange(e, 'min')}
          />
          <span>to</span>
          <input
            type="number"
            min="0"
            max="10"
            value={range.max}
            onChange={(e) => handleInputChange(e, 'max')}
          />
        </div>

        <div className="slider-container">
          <input
            type="range"
            min="0"
            max="10"
            value={range.min}
            onChange={(e) => handleInputChange(e, 'min')}
            className="range-thumb"
          />
          <input
            type="range"
            min="0"
            max="10"
            value={range.max}
            onChange={(e) => handleInputChange(e, 'max')}
            className="range-thumb"
          />
          <div className="range-labels">
            <span>0 Yrs</span>
            <span>10 Yrs</span>
          </div>
        </div>

        <div className="output">
          Selected Range: {range.min} Yrs – {range.max} Yrs
        </div>
      </div> */}
    </>
  );
};

export default RangeSliderNew;
