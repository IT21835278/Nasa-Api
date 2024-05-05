import React, { useEffect, useState } from 'react';
// const API_KEY = import.meta.env.VITE_API_KEY

const Home = () => {
    const [photoData, setPhotoData] = useState(null);
    const [earthImageUrl, setEarthImageUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentDate, setCurrentDate] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                // const photoResponse = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
                const photoResponse = await fetch(`https://api.nasa.gov/planetary/apod?api_key=mYX9ek27uDyyCK9Ax4fhb0Xgv6QItZKsw0h6mjIQ`);

                if (!photoResponse.ok) {
                    throw new Error('Failed to fetch photo data');
                }
                const photoData = await photoResponse.json();
                setPhotoData(photoData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        async function fetchEarthImage() {
            try {
                const response = await fetch('https://api.nasa.gov/planetary/earth/imagery?lon=-95.33&lat=29.78&date=2018-01-01&dim=0.15&api_key=mYX9ek27uDyyCK9Ax4fhb0Xgv6QItZKsw0h6mjIQ');
                if (!response.ok) {
                    throw new Error('Failed to fetch image');
                }
                // Get the image URL from the response headers
                const imageUrl = response.url;
                setEarthImageUrl(imageUrl);
            } catch (error) {
                setError(error.message);
            }
        }

        fetchData();
        fetchEarthImage();

        const intervalId = setInterval(() => {
            const now = new Date();
            setCurrentDate(now.toLocaleString());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='container mx-auto px-4 py-8'>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Photo of</span> the day
                    </h1>
                </div>
                <div className="flex items-center justify-between text-lg text-gray-600 dark:text-blue-400 border-t border-gray-300 dark:border-gray-700 pt-2 mt-4">
                    {currentDate}
                    
                </div>
            </div>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
            <div className='mt-6 text-center'>
                <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    {photoData.title}
                </h2>
            </div>

            <div className='mt-12 text-center'>
                <p className="px-4 mb-3 text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:me-3 first-letter:float-start">
                    {photoData.explanation}
                </p>
            </div>

            
            {photoData && (
                <div className="flex justify-center">
                    <img className="h-auto lg:h-120 w-full max-w-screen-lg rounded-lg " src={photoData.url} alt={photoData.title}/>
                </div>
            )}

            <div className="container mx-auto px-4 py-8">
                <div className='mt-6 text-center'>
                <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Earth Imagery
                </h2>
            </div>
                {earthImageUrl && (
                    <div className="flex justify-center">
                        <img src={earthImageUrl} alt="Earth Imagery" className="max-w-full h-auto shadow-lg rounded-lg" />
                    </div>
                )}
            </div>
            
        </div>
    );
};

export default Home;
