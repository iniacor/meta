import axios from 'axios';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import '../src/styles/index.scss';

const baseUrl = 'https://63ee0ec0388920150dd83e3c.mockapi.io/news';
const newsList = document.querySelector('.news__list');
const loadNewsBtn = document.querySelector('.news-load-btn');

const state = {
  news: [],
  currentPage: 1,
};

const formatDate = dateStr => {
  const date = new Date(dateStr);
  return format(date, 'HH:mm - dd MMMM yyyy', { locale: ru });
};

const createPost = news => `
  <li class="news__list-item">
    <div class="news__item">
      <img
        class="news__item-img"
        loading="lazy"
        src=${news.imageUrl}
        alt="img description"
      />
      <div class="news__item-content">
        <div class="news__item-meta">
          <span class="news__item-time">${formatDate(news.createdAt)}</span>
          <div class="news__item-comments">
            <i class="icon-comments"></i>
            <span class="news__item-comments-quantity">${news.commentsCount}</span>
          </div>
        </div>
        <div class="news__item-wrapper">
          <a class="news__item-link" href="#">
            <h3 class="news__item-title">
              ${news.title}
            </h3>
          </a>
          <p class="news__item-text">
            ${news.content}
          </p>
        </div>
      </div>
    </div>
  </li>
`;

const fillNews = news => {
  newsList.innerHTML = '';
  if (news.length) {
    const fragment = document.createDocumentFragment();
    news.map(oneNews => {
      const li = document.createElement('li');
      li.classList.add('news__list-item');
      li.innerHTML = createPost(oneNews);
      fragment.appendChild(li);
    });
    newsList.appendChild(fragment);
  } else {
    loadNewsBtn.style.display = 'none';
  }
};

const getNewsData = async page => {
  try {
    const { data } = await axios.get(`${baseUrl}?page=${page}&limit=5`);
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const handleButtonClick = async () => {
  try {
    if (state.currentPage === 0) {
      state.news = await getNewsData(1);
      fillNews(state.news);
      state.currentPage = 1;
    } else {
      loadNewsBtn.innerText = 'Завантажую...';
      const moreNews = await getNewsData(state.currentPage);
      state.news = state.news.concat(moreNews);
      fillNews(state.news);
      state.currentPage += 1;
      if (moreNews.length === 0) {
        loadNewsBtn.style.display = 'none';
      } else {
        loadNewsBtn.style.display = 'block';
      }
    }
  } catch (error) {
    console.error(error);
    alert('Failed to load news. Please try again later.');
  } finally {
    loadNewsBtn.innerText = 'Більше новин';
  }
};

loadNewsBtn.addEventListener('click', handleButtonClick);
