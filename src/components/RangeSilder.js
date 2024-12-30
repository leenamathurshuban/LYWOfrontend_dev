import React, { useState } from 'react';

function RangeSlider() {
    const [minValue, setMinValue] = useState(2); // Start with 2 years
    const [maxValue, setMaxValue] = useState(20); // Start with 20 years
  
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
        <div className="range-slider-container position-relative">
          {/* Range track */}
          <div className="range-track"></div>
  
          {/* Active range */}
          <div
            className="range-active"
            style={{
              left: `${((minValue - 2) / 18) * 100}%`,
              width: `${((maxValue - minValue) / 18) * 100}%`,
            }}
          ></div>
  
          {/* Minimum handle */}
          <input
            type="range"
            className="range-input"
            min="2"
            max="20"
            step="1"
            value={minValue}
            onChange={handleMinChange}
          />
  
          {/* Maximum handle */}
          <input
            type="range"
            className="range-input"
            min="2"
            max="20"
            step="1"
            value={maxValue}
            onChange={handleMaxChange}
          />
        </div>
        <div className="d-flex justify-content-between">
          <span className='valuetext'>Min: {minValue} years</span>
          <span className='valuetext'>Max: {maxValue} years</span>
        </div>
      </div>
    );
  }

export default RangeSlider;
