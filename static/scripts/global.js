function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}
const csrftoken = getCookie('csrftoken');
const siteName = '';
const no_products = (products_container) => {
  products_container.textContent = '';
  const contain = createEl('div');
  const noProduct = createEl('div');
  const noProductTitle = createEl('p');
  setClass(contain,'container');
  setClass(noProduct,'alert alert-dark');
  setClass(noProductTitle,'fs-1 fw-bold text-center');
  if (localStorage.getItem('language') === 'ar') {
    noProductTitle.textContent = 'لا توجد منتجات!';
  } else if (localStorage.getItem('language') === 'fr') {
    noProductTitle.textContent = 'Aucun produit !';
  } else {
    noProductTitle.textContent = 'No Products!';
  }
  setChild(noProduct,noProductTitle);
  setChild(contain,noProduct);
  setChild(products_container,contain);
}

const newEl = (el) => {
  return document.createElement(el);
}
const elc = (value,classl) => {
  const name = document.createElement(value);
  name.classList = classl;
  return name;
}

const setClass = (el,classl) => {
  return el.classList = classl;
}
const createEl = (el) => {
  return document.createElement(el);
}
const selectEl = (el) => {
  return document.querySelector(el);
}
const selectAll = (els) => {
  return document.querySelectorAll(els);
}
const setChild = (parent,el) => {
  return parent.appendChild(el);
}
const is_loading = (container) => {
  container.innerHTML = `
  <div class="d-flex justify-content-center my-5">
    <div class="spinner-grow text-primary" role="status"><span class="visually-hidden">Loading...</span></div>
    <div class="spinner-grow text-secondary" role="status"><span class="visually-hidden">Loading...</span></div>
    <div class="spinner-grow text-success" role="status"><span class="visually-hidden">Loading...</span></div>
    <div class="spinner-grow text-danger" role="status"><span class="visually-hidden">Loading...</span></div>
    <div class="spinner-grow text-warning" role="status"><span class="visually-hidden">Loading...</span></div>
    <div class="spinner-grow text-info" role="status"><span class="visually-hidden">Loading...</span></div>
    <div class="spinner-grow text-light" role="status"><span class="visually-hidden">Loading...</span></div>
    <div class="spinner-grow text-dark" role="status"><span class="visually-hidden">Loading...</span></div>
  </div>`;
}
