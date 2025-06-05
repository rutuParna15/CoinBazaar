import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { ShoppingBag, Tag, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';


const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState<any[]>([]);
  const [listings, setListings] = useState<any[]>([]);

  const { user } = useAuth();
  console.log('user', user);


  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
  
      try {
        const res = await fetch('http://localhost:5000/api/coins');
        const coins = await res.json();
        // console.log('coins',coins[0])
  
        // Assuming coins have `seller: { _id: string, name: string }`
        const userListings = coins.filter((coin: any) => coin.seller._id === user._id);
        console.log('userListings', userListings);
  
        // Mock: No purchase data in your API yet
        const userPurchases: any[] = []; // EMPTY for now, or you can simulate
  
        setListings(userListings);
        setPurchases(userPurchases);
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
  
      setLoading(false);
    };
  
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold text-navy-800 mb-8">Your Dashboard</h1>
        
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stats Card 1 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-navy-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <ShoppingBag className="w-6 h-6 text-navy-600" />
              </div>
              <div>
                <p className="text-gray-500">Total Purchases</p>
                <h3 className="text-2xl font-bold text-navy-800">{purchases.length}</h3>
              </div>
            </div>
          </div>
          
          {/* Stats Card 2 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-gold-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <Tag className="w-6 h-6 text-gold-600" />
              </div>
              <div>
                <p className="text-gray-500">Active Listings</p>
                <h3 className="text-2xl font-bold text-navy-800">
                  {listings.filter(listing => listing.status === 'Active').length}
                </h3>
              </div>
            </div>
          </div>
          
          {/* Stats Card 3 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-copper-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <CheckCircle className="w-6 h-6 text-copper-600" />
              </div>
              <div>
                <p className="text-gray-500">Items Sold</p>
                <h3 className="text-2xl font-bold text-navy-800">
                  {listings.filter(listing => listing.status === 'Sold').length}
                </h3>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <Tabs defaultValue="purchases" className="w-full">
            <div className="px-6 pt-6">
              <TabsList className="grid grid-cols-2 gap-4 mb-6">
                <TabsTrigger 
                  value="purchases"
                  className="flex items-center justify-center gap-2 py-3 text-gray-600 border border-gray-200 rounded-md data-[state=active]:text-navy-800 data-[state=active]:bg-navy-50 data-[state=active]:border-navy-200"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Your Purchases</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="listings"
                  className="flex items-center justify-center gap-2 py-3 text-gray-600 border border-gray-200 rounded-md data-[state=active]:text-navy-800 data-[state=active]:bg-navy-50 data-[state=active]:border-navy-200"
                >
                  <Tag className="w-5 h-5" />
                  <span>Your Listings</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="purchases" className="p-0">
              {purchases.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No purchases yet</h3>
                  <p className="text-gray-500">
                    Coins you buy will appear here
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Coin
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Purchase Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {purchases.map((purchase) => (
                        <tr key={purchase._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-12 w-12 flex-shrink-0">
                                <img 
                                  src={purchase.image} 
                                  alt={purchase.coinName} 
                                  className="h-12 w-12 object-cover rounded-md" 
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-navy-800">
                                  {purchase.coinName}
                                </div>
                                <div className="text-sm text-gray-500">
                                  ID: {purchase.coinId}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-navy-800">
                              ${purchase.price.toLocaleString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {formatDate(purchase.purchaseDate)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {purchase.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="listings" className="p-0">
              {listings.length === 0 ? (
                <div className="text-center py-12">
                  <Tag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No listings yet</h3>
                  <p className="text-gray-500">
                    Coins you list for sale will appear here
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Coin
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Listing Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Views
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {listings.map((listing) => (
                        <tr key={listing._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-12 w-12 flex-shrink-0">
                                <img 
                                  src={listing.image} 
                                  alt={listing.name} 
                                  className="h-12 w-12 object-cover rounded-md" 
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-navy-800">
                                  {listing.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  ID: {listing._id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-navy-800">
                              ${listing.price.toLocaleString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {formatDate(listing.createdAt)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              listing.status === 'Active' 
                                ? 'bg-green-100 text-green-800' 
                                : listing.status === 'Sold'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {listing.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {listing.views} views · {listing.likes} likes
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;