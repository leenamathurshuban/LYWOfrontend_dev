import React, { useState } from "react";

function RangeSlider({
  minValue,
  setMinValue,
  maxValue,
  setMaxValue,
  displayMaxValue,
}) {
  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxValue - 1);
    setMinValue(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minValue + 1);
    setMaxValue(value);
  };

  return (
    <div className="range-slider-wapper">
      <div className="slider-container">
        <div className="range-slider-container position-relative">
          {/* Range track */}
          <div className="range-track"></div>
          <div
            className="range-active"
            style={{
              width: "100%",
            }}
          ></div>
          <input
            type="range"
            min="0"
            max="50"
            value={minValue}
            className="slider min-slider"
            onChange={handleMinChange}
          />
          <input
            type="range"
            min="0"
            max="40"
            value={maxValue}
            className="slider max-slider"
            onChange={handleMaxChange}
          />
          <div className="d-flex justify-content-between">
            <span id="minValue">{minValue}</span>
            <span id="maxValue">{displayMaxValue(maxValue)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RangeSlider;
