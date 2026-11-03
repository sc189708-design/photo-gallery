import { useState, useEffect } from 'react';
const useFetchPhotos = () => {
    const [photo, setphoto] = useState([]);
    const [loding, setLoding] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        const getphotodata = async () => {
            try {
                setLoding(true);
                setError(false);

                const response = await fetch("https://picsum.photos/v2/list?limit=30")
                if (!response.ok) {
                    throw new Error('something is woring here')
                }
                const data = await response.json();
                setphoto(data)
            } catch (err) {
                setError(`something is wrong plase try again , ${err.message}`)
            } finally {
                setLoding(false)
            }
        }; getphotodata();
    }, [])
    return { photo, loding, error }
};
export default useFetchPhotos;