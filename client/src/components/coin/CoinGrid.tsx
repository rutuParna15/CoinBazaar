import React from 'react';
import CoinCard from './CoinCard';
import LoadingSpinner from '../ui/LoadingSpinner';

interface CoinProps {
  _id: string;
  name: string;
  type: string;
  age: number;
  price: number;
  description: string;
  image: string;
}

interface CoinGridProps {
  coins: CoinProps[];
  loading: boolean;
}

const CoinGrid: React.FC<CoinGridProps> = ({ coins, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (coins.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-2xl font-medium text-gray-600">No coins found</h3>
        <p className="mt-2 text-gray-500">Try adjusting your filters or check back later</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {coins.map((coin) => (
        <CoinCard key={coin._id} coin={coin} />
      ))}
    </div>
  );
};

export default CoinGrid;