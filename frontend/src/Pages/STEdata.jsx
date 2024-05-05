import React, { useState, useEffect } from 'react';
import TLEheaderImg from '../assets/TLE2.jpg'
import Gif1 from '../assets/gif1.gif'

const STEdata = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://tle.ivanstanojevic.me/api/tle/');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data ? data.member.filter(satellite =>
    satellite.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Two-line element s</span>atellite data</h1>
      </div>
      <div className="w-full ">
        <img src={TLEheaderImg} className="w-full h-46 object-cover shadow-lg rounded-lg" />
      </div>

      <div className="flex mt-20">
        <div className="w-1/2">
          <img src={Gif1} className='h-80 w-full object-cover shadow-lg rounded-lg'/>
        </div>
        <div className="w-1/2 ml-10">
          <p className="mt-7 mb-3 text-center text-indigo-800 dark:text-indigo-400">Two-Line Element Sets (TLEs) are general perturbation mean elements constructed by a least squares estimation from observations of a satellite's orbit. A derivation of the Two-Line Element set format called the Three-Line Element set exists where the first line contains the name of the satellite. The TLE format was developed to provide a compact and standardized way to convey essential orbital data for tracking and predicting the motion of satellites. It is widely used by various organizations, including satellite operators, space agencies, and tracking networks. A typical TLE consists of two lines of text.</p>
        </div>
      </div>

      <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>


      <div className="flex justify-end ">
      <div className="w-64 mt-20">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search by satellite name</label>
        <div className="relative">
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-violet-400 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search by satellite name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </div>




      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div>
          {filteredData.map((satellite, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden mt-4 mb-4">
              <div className="p-4">
                <p className="font-bold text-lg mb-2">Satellite Name: {satellite.name}</p>
                <p className="text-sm text-gray-600">Date: {satellite.date}</p>
                <p className="text-sm text-gray-600">Satellite ID: {satellite.satelliteId}</p>
              </div>
              <div className="p-4 bg-gray-100">
                <p className="text-sm font-bold mb-2">TLE Lines</p>
                <p className="text-xs text-gray-600">Line 1: {satellite.line1}</p>
                <p className="text-xs text-gray-600">Line 2: {satellite.line2}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default STEdata;
