import React, { useEffect, useState } from 'react';
const API_KEY = import.meta.env.VITE_API_KEY


const MarsRoverCuriosity = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPhotos() {
            try {
                const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${API_KEY}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch photos');
                }
                const data = await response.json();
                setPhotos(data.photos);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchPhotos();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className='text-center'>
                    <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Mars Rover Curi</span>osity Photos</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map(photo => (
                    <div key={photo.id} className="flex flex-col">
                        <img 
                            src={photo.img_src} 
                            alt={`Mars Photo ${photo.id}`} 
                            className="h-80 w-full object-cover shadow-lg rounded-lg" 
                            title={`${photo.earth_date} - Camera: ${photo.camera.full_name}`} 
                        />
                        <p className="mt-2 text-center">{photo.earth_date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MarsRoverCuriosity;
