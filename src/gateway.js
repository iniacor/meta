import axios from 'axios';

const baseUrl = 'https://63ee0ec0388920150dd83e3c.mockapi.io/news';

const getNewsData = async page => {
  try {
    const { data } = await axios.get(`${baseUrl}?page=${page}&limit=5`);
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default getNewsData;
