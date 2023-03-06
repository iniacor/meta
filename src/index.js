import formatDate from './utils';
import getNewsData from './gateway';
import '../src/styles/index.scss';

const newsList = document.querySelector('.news__list');
const loadNewsBtn = document.querySelector('.news-load-btn');

const state = {
  news: [],
  currentPage: 1,
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
    news.forEach(oneNews => {
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
  } finally {
    loadNewsBtn.innerText = 'Більше новин';
  }
};

loadNewsBtn.addEventListener('click', handleButtonClick);
