"use client"
import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select';

interface FilterSidebarProps {
  handleFilterChange: (duration: string) => void;
  selectedDuration: string; 
}  

const FilterSidebar: React.FC<FilterSidebarProps> = ({ handleFilterChange, selectedDuration }) => {
  const handleDurationChange = (event: SelectChangeEvent) => {
    const duration = event.target.value as string;
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
          <Select
            value={selectedDuration}
            onChange={handleDurationChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Duration' }}
          >
            <MenuItem value="" disabled>
              Duration
            </MenuItem>
            <MenuItem value="1-10">1 - 10 Days</MenuItem>
            <MenuItem value="11-20">11 - 20 Days</MenuItem>
            <MenuItem value="21-31">21 - 31 Days</MenuItem>
          </Select>
       </div>
       
      
       </div> 
       </div>
)}

export default FilterSidebar;