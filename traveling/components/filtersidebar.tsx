"use client"
import React, { useState } from 'react';

interface FilterSidebarProps {
  handleFilterChange: (duration: string) => void;
  selectedDuration: string; 
}  

const FilterSidebar: React.FC<FilterSidebarProps> = ({ handleFilterChange, selectedDuration }) => {
  const handleDurationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedRange = parseInt(event.target.value);
    let duration = "";

    if (selectedRange >= 1 && selectedRange <= 10) {
      duration = `${selectedRange}-${selectedRange + 2}`;
    } else if (selectedRange >= 11 && selectedRange <= 20) {
      duration = `${selectedRange}-${selectedRange + 4}`;
    } else if (selectedRange >= 21 && selectedRange <= 31) {
      duration = `${selectedRange}-${selectedRange + 10}`;
    }
    
    handleFilterChange(duration);
  };

  return (
    <div className='lg:w-80 sm:w-full'>
      <div className="lg:w-80 sm:w-full bg-gray-300 h-96 p-4">
        <div className="flex justify-between mb-4">
          <h3>Filter</h3>
          <h3 onClick={() => handleFilterChange('')}>Reset</h3>
        </div>
        <div>
          <label htmlFor="durationRange">Duration Range:</label>
          <input
            type="range"
            id="durationRange"
            min="1"
            max="31"
            value={parseInt(selectedDuration.split("-")[0]) || 1} // Set the value to the start of the range or default to 1
            onChange={handleDurationChange}
            step="1"
          />
          <output htmlFor="durationRange">{selectedDuration} Days</output>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
