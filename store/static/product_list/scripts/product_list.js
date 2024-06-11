const list_id = parseInt(window.location.href.split('/').slice(-1));
let page = 1;
sessionStorage.getItem(`api-product-category-${list_id}`) ? page = parseInt(sessionStorage.getItem(`api-product-category-${list_id}`)) : page = 1;

const product_list_container = document.querySelector('.product-list-container');
const url = `${siteName}/product/list/category/${list_id}?page=`;

const card_filters = document.querySelector('.card-filters');
const card_filters_title = document.querySelector('.card-filters__title');
const search_name = document.querySelector('#search_name');
const search_name_label = document.querySelector('.search-name-label');
const price_gt = document.querySelector('#search_price_gt');
const price_gt_label = document.querySelector('.search-price_gt-label');
const price_lt = document.querySelector('#search_price_lt');
const price_lt_label = document.querySelector('.search-price_lt-label');
const paginationCategory = document.querySelector('.pagination-box-category');

// fetchProductCard(url,page);
let list_name = '';
let price_gt_v = 0;
let price_lt_v = 100000000;
const filter_product_list = async ()=> {
  page = 1
  price_gt_v === '' ? price_gt_v = 0 : price_gt_v;
  price_lt_v === '' ? price_lt_v = 100000000 : price_lt_v;
  const response = await fetch(`${siteName}/product/list/filter/${list_id}?name=${list_name}&page=${page}&price_gt=${price_gt_v}&price_lt=${price_lt_v}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
    },
  });
  const data = await response.json();
  return data
}
const check_product_lang = async () => {
  if (localStorage.getItem('language') === 'ar') {
    await fetchProducts('تخفيض','نفذ من المخزن','ar',product_list_container,filter_product_list(),'col-md-6 col-lg-4 col-xl-3');
  } else if (localStorage.getItem('language') === 'en') {
    await fetchProducts('SALE','STOCK OUT','en',product_list_container,filter_product_list(),'col-md-6 col-lg-4 col-xl-3');
  } else if (localStorage.getItem('language') === 'fr') {
    await fetchProducts('SOLDE','FIN DE STOCK','fr',product_list_container,filter_product_list(),'col-md-6 col-lg-4 col-xl-3');
  }
}
search_name.addEventListener('keyup',async (e)=> {
  list_name = e.target.value;
  pagination(paginationCategory,product_list_container,filter_product_list(),`api-product-category-${list_id}`,'col-md-6 col-lg-4 col-xl-3');
  await check_product_lang();
})
price_gt.addEventListener('keyup',async (e)=> {
  price_gt_v = e.target.value;
  pagination(paginationCategory,product_list_container,filter_product_list(),`api-product-category-${list_id}`,'col-md-6 col-lg-4 col-xl-3');
  await check_product_lang();
})
price_lt.addEventListener('keyup',async (e)=> {
  price_lt_v = e.target.value;
  pagination(paginationCategory,product_list_container,filter_product_list(),`api-product-category-${list_id}`,'col-md-6 col-lg-4 col-xl-3');
  await check_product_lang();
})

pagination(paginationCategory,product_list_container,filter_product_list(),`api-product-category-${list_id}`,'col-md-6 col-lg-4 col-xl-3');

ar.onclick = () => { // change lang to arabic
  localStorage.setItem('language','ar');
  productList();
  category_list();
  language();
}
en.onclick = () => { // change lang to english
  localStorage.setItem('language','en');
  productList();
  category_list();
  language();
}
fr.onclick = () => { // change lang to frensh
  localStorage.setItem('language','fr');
  productList();
  category_list();
  language();
}

themeSwitchBtn.onclick = () => {
  if (localStorage.getItem('theme-mood') === 'dark') {
    localStorage.setItem('theme-mood','light');
  } else {
    localStorage.setItem('theme-mood','dark');
  }
  product_list_theme();
  category_list();
  theme();
  chatRoomsTheme();
}


const productList = async () => {
  if (localStorage.getItem('language') === 'ar') {
    card_filters_title.textContent = 'فلترات';
    search_name_label.textContent = 'الاسم:';
    search_name.placeholder = 'البحث عن المنتج بالاسم ...'
    price_gt_label.textContent = 'السعر أكبر من:';
    price_lt_label.textContent = 'السعر أقل من:';
    price_gt.placeholder = 'البحث بالسعر ...';
    price_lt.placeholder = 'البحث بالسعر ...';
    await fetchProducts('تخفيض','نفذ من المخزن','ar',product_list_container,fetchProductCard(url,page),'col-md-6 col-lg-4 col-xl-3');
  } else if (localStorage.getItem('language') === 'en') {
    card_filters_title.textContent = 'FILTERS';
    search_name_label.textContent = 'Name:';
    search_name.placeholder = 'Search Product By Name...'
    price_gt_label.textContent = 'Price greater than:';
    price_lt_label.textContent = 'Price less than:';
    price_gt.placeholder = 'Search by price...';
    price_lt.placeholder = 'Search by price...';
    await fetchProducts('SALE','STOCK OUT','en',product_list_container,fetchProductCard(url,page),'col-md-6 col-lg-4 col-xl-3');
  } else if (localStorage.getItem('language') === 'fr') {
    card_filters_title.textContent = 'FILTRES';
    search_name_label.textContent = 'Nom:';
    search_name.placeholder = 'Rechercher un produit par nom...';
    price_gt_label.textContent = 'Prix supérieur à :';
    price_lt_label.textContent = 'Prix inférieur à :';
    price_gt.placeholder = 'Recherche par prix...';
    price_lt.placeholder = 'Recherche par prix...';
    await fetchProducts('SOLDE','FIN DE STOCK','fr',product_list_container,fetchProductCard(url,page),'col-md-6 col-lg-4 col-xl-3');
  }
}

const product_list_theme = () => {
  if (localStorage.getItem('theme-mood') === 'light') {
    card_filters.classList = 'card card-filters light';
    card_filters_title.classList = 'card-title p-3 text-center fw-bold card-filters__title light';
  } else {
    card_filters.classList = 'card card-filters dark';
    card_filters_title.classList = 'card-title p-3 text-center fw-bold card-filters__title dark';
  }
}
productList();
product_list_theme();