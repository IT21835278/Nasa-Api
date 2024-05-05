import React, { useEffect, useState } from 'react';
const API_KEY = import.meta.env.VITE_API_KEY


const NEOPage = () => {
    const [neoData, setNeoData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchNeoData() {
            try {
                const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=${API_KEY}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                // Extract the NEO objects from the response
                const neoObjects = Object.values(data.near_earth_objects).flat();
                setNeoData(neoObjects);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchNeoData();
    }, []);

    if (loading) return <div className="py-8 text-center">Loading...</div>;
    if (error) return <div className="py-8 text-center text-red-500">Error: {error}</div>;
    console.log(neoData);

    return (
        <div className="container mx-auto py-8">
            {/* <h1 className="text-3xl font-bold mb-8 text-center">Near Earth Objects</h1> */}
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Near Ear</span>th Objects</h1>
            {neoData && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {neoData.map(neoObject => (
                        <div key={neoObject.id} className="bg-white shadow-md rounded-md p-6">
                            <h2 className="text-xl font-semibold mb-4">{neoObject.name}</h2>
                            <p className="text-gray-700 mb-2">Estimated Diameter: {neoObject.estimated_diameter.meters.estimated_diameter_max} meters</p>
                            <p className="text-gray-700 mb-2">Hazardous: {neoObject.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>
                            <p className="text-gray-700 mb-2">Miss Distance: {neoObject.close_approach_data[0].miss_distance.kilometers} kilometers</p>
                            <p className="text-gray-700">Relative Velocity: {neoObject.close_approach_data[0].relative_velocity.kilometers_per_hour} km/h</p>
                            {/* Add more information as needed */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NEOPage;
