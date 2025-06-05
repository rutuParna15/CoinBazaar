import React, { useState } from 'react';
import { Sliders, X } from 'lucide-react';
import Button from '../ui/Button';

interface FilterProps {
  onFilterChange: (filters: FilterValues) => void;
  coinTypes: string[];
}

export interface FilterValues {
  priceRange: [number, number];
  coinTypes: string[];
  ageRange: [number, number];
}

const CoinFilter: React.FC<FilterProps> = ({ onFilterChange, coinTypes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({
    priceRange: [0, 10000],
    coinTypes: [],
    ageRange: [0, 200],
  });

  const handleFilterChange = (key: keyof FilterValues, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleTypeToggle = (type: string) => {
    setFilters(prev => {
      const newTypes = prev.coinTypes.includes(type)
        ? prev.coinTypes.filter(t => t !== type)
        : [...prev.coinTypes, type];
      
      return {
        ...prev,
        coinTypes: newTypes
      };
    });
  };

  const applyFilters = () => {
    onFilterChange(filters);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const resetFilters = () => {
    const defaultFilters = {
      priceRange: [0, 10000],
      coinTypes: [],
      ageRange: [0, 200],
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="relative">
      {/* Mobile filter button */}
      <div className="flex justify-between items-center mb-4 md:hidden">
        <h2 className="text-xl font-serif font-semibold">Filters</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2"
        >
          <Sliders size={16} />
          Filters
        </Button>
      </div>

      {/* Filter sidebar */}
      <div 
        className={`
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
          transition-transform duration-300 ease-in-out
          md:relative fixed top-0 left-0 h-full md:h-auto z-30
          bg-white md:bg-transparent shadow-lg md:shadow-none
          w-3/4 sm:w-1/2 md:w-full p-6 md:p-0 overflow-y-auto
        `}
      >
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h3 className="text-lg font-semibold">Filters</h3>
          <button onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Price Range Filter */}
          <div className="border-b pb-4">
            <h3 className="font-semibold text-navy-800 mb-3">Price Range</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>₹{filters.priceRange[0]}</span>
                <span>₹{filters.priceRange[1]}+</span>
              </div>
              <input
                type="range"
                min="0"
                max="10000"
                step="500"
                value={filters.priceRange[1]}
                onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                className="w-full accent-gold-500"
              />
            </div>
          </div>

          {/* Coin Type Filter */}
          <div className="border-b pb-4">
            <h3 className="font-semibold text-navy-800 mb-3">Coin Type</h3>
            <div className="space-y-2">
              {coinTypes.map((type) => (
                <div key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`type-${type}`}
                    checked={filters.coinTypes.includes(type)}
                    onChange={() => handleTypeToggle(type)}
                    className="h-4 w-4 accent-gold-500"
                  />
                  <label htmlFor={`type-${type}`} className="ml-2 text-gray-700">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Age Range Filter */}
          <div className="border-b pb-4">
            <h3 className="font-semibold text-navy-800 mb-3">Coin Age (Years)</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>{filters.ageRange[0]}</span>
                <span>{filters.ageRange[1]}+</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                step="10"
                value={filters.ageRange[1]}
                onChange={(e) => handleFilterChange('ageRange', [filters.ageRange[0], parseInt(e.target.value)])}
                className="w-full accent-gold-500"
              />
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex flex-col gap-2">
            <Button 
              variant="primary" 
              onClick={applyFilters}
              className="w-full"
            >
              Apply Filters
            </Button>
            <Button 
              variant="outline" 
              onClick={resetFilters}
              className="w-full"
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default CoinFilter;