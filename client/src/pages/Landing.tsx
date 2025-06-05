import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Coins, Award, ShieldCheck, TrendingUp, MapPin } from 'lucide-react';
import Button from '../components/ui/Button';
import Footer from '../components/layout/Footer';

const Landing: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/marketplace');
    } else {
      navigate('/auth');
    }
  };

  const handleOpenGoogleMaps = () => {
    // Coordinates for New York City
    const latitude = '40.7128';
    const longitude = '-74.0060';
    window.open(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-navy-900 to-navy-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                Discover <span className="text-gold-500">Heritage Coins</span> from Around the World
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                Buy, sell and collect rare and valuable coins with historical significance.
                Join our trusted marketplace of passionate collectors and sellers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={handleGetStarted}
                  className="font-bold text-lg"
                >
                  Get Started
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => navigate('/marketplace')}
                  className="border-white text-white hover:bg-white/10"
                >
                  Explore Marketplace
                </Button>
              </div>
            </div>
            <div className="animate-fade-in relative">
              <div className="relative z-10 grid grid-cols-2 gap-4">
                <div className="transform -rotate-6 transition-transform hover:rotate-0 duration-300">
                  <img 
                    src="https://images.pexels.com/photos/3222684/pexels-photo-3222684.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" 
                    alt="Ancient coin" 
                    style={{ width: '250px', height: '350px' }}
                    className="rounded-lg shadow-lg" 
                  />
                </div>
                <div className="transform rotate-3 transition-transform hover:rotate-0 duration-300 mt-8">
                  <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7QlhOJSwy6cnzdhzU861JrZeNyvEw5ywUfA&s" 
                    alt="Gold coin" 
                    style={{ width: '250px', height: '180px' }}
                    className="rounded-lg shadow-lg" 
                  />
                </div>
                <div className="transform rotate-6 transition-transform hover:rotate-0 duration-300">
                  <img 
                    src="https://media.istockphoto.com/id/1344923993/photo/a-treasure-of-roman-gold-and-silver-coins-trajan-decius-ad-249-251-av-aureus-ancient-coin-of.jpg?s=612x612&w=0&k=20&c=kCIK3whDtruNBE4DXimeNMtKHA0BT2UNpoKSjd8i4hw=" 
                    alt="Silver coin" 
                    style={{ width: '250px', height: '180px' }}
                    className="rounded-lg shadow-lg" 
                  />
                </div>
                <div className="transform -rotate-3 transition-transform hover:rotate-0 duration-300 mt-8">
                  <img 
                    src="https://thumbs.dreamstime.com/b/pile-golden-coins-rustic-wooden-surface-nostalgic-aesthetic-old-world-charm-pile-golden-coins-rustic-wooden-surface-364415891.jpg" 
                    alt="Rare coin" 
                    style={{ width: '250px', height: '180px' }}
                    className="rounded-lg shadow-lg" 
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/30 to-transparent rounded-3xl transform -rotate-3 -z-10"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-800 mb-4">
              Why Choose HeritageCoin
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our marketplace is designed with collectors in mind, offering the best experience
              for buying and selling heritage coins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-gold-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-gold-500" />
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-2">Authentic Coins</h3>
              <p className="text-gray-600">
                Every coin is verified for authenticity before listing on our marketplace.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-copper-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="w-8 h-8 text-copper-500" />
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-2">Secure Transactions</h3>
              <p className="text-gray-600">
                Our payment system ensures secure transactions and buyer protection.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-silver-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Coins className="w-8 h-8 text-silver-500" />
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-2">Wide Selection</h3>
              <p className="text-gray-600">
                Discover coins from different eras, regions, and historical periods.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-navy-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-navy-500" />
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-2">Investment Value</h3>
              <p className="text-gray-600">
                Heritage coins often appreciate in value over time, making them great investments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-2xl bg-gradient-to-r from-navy-800 to-navy-600 overflow-hidden">
            <div className="md:flex">
              <div className="p-8 md:p-12 md:w-3/5">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                  Ready to Start Your Collection?
                </h2>
                <p className="text-lg text-gray-300 mb-8">
                  Join thousands of collectors worldwide and discover your next valuable heritage coin.
                </p>
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={handleGetStarted}
                >
                  Get Started Now
                </Button>
              </div>
              <div className="md:w-2/5 relative overflow-hidden hidden md:block">
                <img 
                  src="https://w0.peakpx.com/wallpaper/861/688/HD-wallpaper-coins-ancient-brown-collection-old-vintage.jpg"
                  alt="Heritage coins collection"
                  className="h-full w-full object-cover object-center" 
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-navy-800/90"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-navy-800 mb-4">
              Visit Our Store
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience our collection in person at our location.
              Our expert numismatists are ready to assist you.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 bg-white">
              <div className="flex items-start gap-4">
                {/* <MapPin className="w-5 h-5 text-gold-500 flex-shrink-0 mt-1" /> */}
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3412.5701941671446!2d72.86368999999999!3d19.063174000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8e87967c565%3A0x38d1984176fa6887!2sC-101%2C%20G%20Block%20BKC%2C%20Bandra%20Kurla%20Complex%2C%20Bandra%20East%2C%20Mumbai%2C%20Maharashtra%20400051!5e1!3m2!1sen!2sin!4v1745814922208!5m2!1sen!2sin" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>                <div>
                  <h3 className="font-bold text-navy-800 mb-1">CoinBazaar BKC</h3>
                  <p className="text-gray-600">
                  C-101, G Block BKC,<br/> Bandra Kurla Complex,<br/> Bandra East, Mumbai,<br/> Maharashtra 400051
                  </p>
                  <p className="mt-2 text-navy-600">
                    Open Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Landing;