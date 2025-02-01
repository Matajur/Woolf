import axios from 'axios'

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

axios.defaults.baseURL = 'https://api.unsplash.com'

export const fetchImages = async (query, page) => {
    const response = await axios.get(
        `/search/photos`,
        {
            params: { query, per_page: 10, page },
            headers: {
                Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
            },
        }
    );
    return response.data.results
}
