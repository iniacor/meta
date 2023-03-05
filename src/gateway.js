import axios from 'axios';

const baseUrl = 'https://63ee0ec0388920150dd83e3c.mockapi.io/news?limit=5&page=1';

const getNewsList = async () => {
  try {
    const { data } = await axios.get(baseUrl);
    const newsList = (state.news = state.news.concat(data));
    return newsList;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export default getNewsList;
