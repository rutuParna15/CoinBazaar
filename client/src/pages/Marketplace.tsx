import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import CoinGrid from '../components/coin/CoinGrid';
import CoinFilter, { FilterValues } from '../components/coin/CoinFilter';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Marketplace: React.FC = () => {
  const [coins, setCoins] = useState<any[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [coinTypes, setCoinTypes] = useState<string[]>([]);

  const fetchCoins = async (filters?: FilterValues) => {
    setLoading(true);
    try {
      let url = 'http://localhost:5000/api/coins';

      // If you want to send filters as query params
      if (filters) {
        const params = new URLSearchParams();
        
        if (filters.priceRange) {
          params.append('minPrice', String(filters.priceRange[0]));
          params.append('maxPrice', String(filters.priceRange[1]));
        }
        if (filters.ageRange) {
          params.append('minAge', String(filters.ageRange[0]));
          params.append('maxAge', String(filters.ageRange[1]));
        }
        if (filters.coinTypes.length > 0) {
          // If multiple types selected, you can choose to pass first one, or adapt for multiple
          params.append('type', filters.coinTypes[0]);
        }
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      setCoins(data);
      setFilteredCoins(data);

      const types = [...new Set(data.map((coin: any) => coin.type))];
      setCoinTypes(types);
    } catch (error) {
      console.error('Error fetching coins:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query.trim()) {
      setFilteredCoins(coins);
      return;
    }

    const results = coins.filter(coin =>
      coin.name.toLowerCase().includes(query.toLowerCase()) ||
      coin.description.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredCoins(results);
  };

  const handleFilter = (filters: FilterValues) => {
    fetchCoins(filters);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-navy-800 rounded-xl overflow-hidden mb-8">
          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Explore Heritage Coins
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mb-6">
              Discover rare and valuable coins from different eras and regions.
              Each coin tells a unique story of history and culture.
            </p>

            {/* Search bar */}
            <div className="relative max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for coins..."
                value={searchQuery}
                onChange={handleSearch}
                className="block w-full pl-10 pr-3 py-3 border border-transparent rounded-md leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar - Filters */}
          <div className="md:w-1/4">
            <CoinFilter onFilterChange={handleFilter} coinTypes={coinTypes} />
          </div>

          {/* Main content */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif font-semibold text-navy-800">
                  Available Coins
                </h2>
                <span className="text-gray-600">
                  {filteredCoins.length} {filteredCoins.length === 1 ? 'coin' : 'coins'} found
                </span>
              </div>

              {loading ? (
                <LoadingSpinner />
              ) : (
                <CoinGrid coins={filteredCoins} loading={false} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
