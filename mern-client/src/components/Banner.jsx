import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BannerCard from '../home/BannerCard';

const Banner = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className='px-4 lg:px-24 bg-teal-100 flex items-center'>
      <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>
        {/* left side */}
        <div className='md:w-1/2 space-y-8 h-full'>
          <h2 className='text-5xl font-bold leading-snug text-black'>
            Buy and Sell Your Books <span className='text-blue-700'>for the Best Prices</span>
          </h2>
          <p className='md:w-4/5'>
            Discover a World of Literature at Your Fingertips. Your One-Stop Destination for All Things Books. Discover a World of Knowledge and Adventure Through Our Books
          </p>
          <div>
            <input
              type="search"
              name="search"
              id="search"
              placeholder='Search a book'
              className='py-2 px-2 rounded-s-sm outline-none'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
            <button
              onClick={handleSearch}
              className='bg-blue-700 px-6 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-200'
            >
              Search
            </button>
          </div>
        </div>

        {/* right side */}
        <div>
          <BannerCard />
        </div>
      </div>
    </div>
  );
};

export default Banner;
