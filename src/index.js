import axios from 'axios';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import '../src/styles/index.scss';

// const baseUrl = 'https://63ee0ec0388920150dd83e3c.mockapi.io/news?limit=5&page=1';

// const newsList = document.querySelector('.news__list');
// const loadNewsBtn = document.querySelector('.news-load-btn');

// const state = {
//   news: [],
// };

// const formatDate = dateStr => {
//   const date = new Date(dateStr);
//   return format(date, 'HH:mm - dd MMMM yyyy', { locale: ru });
// };

// const createPost = news => `
//   <li class="news__list-item">
//     <div class="news__item">
//       <img
//         class="news__item-img"
//         loading="lazy"
//         src=${news.imageUrl}
//         alt="img description"
//       />
//       <div class="news__item-content">
//         <div class="news__item-meta">
//           <span class="news__item-time">${formatDate(news.createdAt)}</span>
//           <div class="news__item-comments">
//             <i class="icon-comments"></i>
//             <span class="news__item-comments-quantity">${news.commentsCount}</span>
//           </div>
//         </div>
//         <div class="news__item-wrapper">
//           <a class="news__item-link" href="#">
//             <h3 class="news__item-title">
//               ${news.title}
//             </h3>
//           </a>
//           <p class="news__item-text">
//             ${news.content}
//           </p>
//         </div>
//       </div>
//     </div>
//   </li>
// `;

// const fillNews = news => {
//   newsList.innerHTML = '';
//   if (news.length) {
//     const fragment = document.createDocumentFragment();
//     news.map(oneNews => {
//       const li = document.createElement('li');
//       li.classList.add('news__list-item');
//       li.innerHTML = createPost(oneNews);
//       fragment.appendChild(li);
//     });
//     newsList.appendChild(fragment);
//   }
// };

// const getNewsData = async () => {
//   try {
//     const { data } = await axios.get(baseUrl);
//     const newsList = (state.news = state.news.concat(data));
//     console.log(newsList);
//     return newsList;
//   } catch (error) {
//     console.error(error.message);
//     throw error;
//   }
// };

// const handleButtonClick = async () => {
//   try {
//     await getNewsData();
//     fillNews(state.news);
//   } catch (error) {
//     console.error(error);
//   }
// };

// loadNewsBtn.addEventListener('click', handleButtonClick);
const baseUrl = 'https://63ee0ec0388920150dd83e3c.mockapi.io/news';
let currentPage = 1;

const newsList = document.querySelector('.news__list');
const loadNewsBtn = document.querySelector('.news-load-btn');
const loadMoreNewsBtn = document.createElement('button');
loadMoreNewsBtn.classList.add('news-load-more-btn');
loadMoreNewsBtn.innerText = 'Більше новин';
loadMoreNewsBtn.style.display = 'none';

const state = {
  news: [],
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
  if (news.length) {
    const fragment = document.createDocumentFragment();
    news.map(oneNews => {
      const li = document.createElement('li');
      li.classList.add('news__list-item');
      li.innerHTML = createPost(oneNews);
      fragment.appendChild(li);
    });
    newsList.appendChild(fragment);

    if (news.length < 5) {
      loadMoreNewsBtn.style.display = 'none';
    } else {
      loadMoreNewsBtn.style.display = 'block';
      loadNewsBtn.style.display = 'none';
    }
  } else {
    loadMoreNewsBtn.style.display = 'none';
  }
};

const getNewsData = async (page = 1) => {
  try {
    const { data } = await axios.get(`${baseUrl}?limit=5&page=${page}`);
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const handleLoadMoreNewsBtnClick = async () => {
  currentPage += 1;
  const moreNews = await getNewsData(currentPage);
  state.news = state.news.concat(moreNews);
  fillNews(moreNews);
};

const handleLoadNewsBtnClick = async () => {
  currentPage = 1;
  state.news = await getNewsData(currentPage);
  newsList.innerHTML = '';
  fillNews(state.news);
  if (state.news.length >= 5) {
    loadMoreNewsBtn.style.display = 'block';
  } else {
    loadMoreNewsBtn.style.display = 'none';
  }
};

loadNewsBtn.addEventListener('click', handleLoadNewsBtnClick);

loadMoreNewsBtn.addEventListener('click', handleLoadMoreNewsBtnClick);
newsList.after(loadMoreNewsBtn);
