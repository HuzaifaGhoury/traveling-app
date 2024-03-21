// RegionFilter.tsx
import React from 'react';

interface RegionFilterProps {
  onSelectRegion: (region: string) => void;
}

const RegionFilter: React.FC<RegionFilterProps> = ({ onSelectRegion }) => {
  const regions = ['Morocco', 'Nepal']; // Add more regions as needed

  return (
    <div>
      <select onChange={(e) => onSelectRegion(e.target.value)}>
        <option value="">All Regions</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RegionFilter;
