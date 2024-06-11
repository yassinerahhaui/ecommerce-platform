
const categoryList = Array.from(document.querySelectorAll('div.category-list')); // select category 
const categoryIconDark = Array.from(document.querySelectorAll('.category-dark'));
const categoryIconLight = Array.from(document.querySelectorAll('.category-light'));
const carousel = document.querySelector('.carousel');


// select category language /3
const lang_en = document.querySelector('div#lang_en');
const lang_fr = document.querySelector('div#lang_fr');
const lang_ar = document.querySelector('div#lang_ar');

// select carousel item for change language
const carouselItem1 = document.querySelector('.carousel-text-1');
const carouselItem2 = document.querySelector('.carousel-text-2');
const carouselItem3 = document.querySelector('.carousel-text-3');


const home_products = document.querySelector('div.home-products');
let page = 1;
sessionStorage.getItem('api-product-list') ? page = parseInt(sessionStorage.getItem('api-product-list')) : page = 1;

let url = `${siteName}/api/product/list?page=`;


const paginationBox = document.querySelector('.pagination-box');

pagination(paginationBox,home_products,fetchProductCard(url,page),'api-product-list','col-sm-6 col-md-4 col-lg-3')

/* fetch product start */
ar.onclick = () => { // change lang to arabic
  localStorage.setItem('language','ar');
  storeLanguage();
  category_list();
  language();
}
en.onclick = () => { // change lang to english
  localStorage.setItem('language','en');
  storeLanguage();
  category_list();
  language();
}
fr.onclick = () => { // change lang to frensh
  localStorage.setItem('language','fr');
  storeLanguage();
  category_list();
  language();
}
themeSwitchBtn.onclick = () => {
  if (localStorage.getItem('theme-mood') === 'dark') {
    localStorage.setItem('theme-mood','light');
  } else {
    localStorage.setItem('theme-mood','dark');
  }
  theme();
  storeTheme();
  category_list();
  chatRoomsTheme();
}


const storeLanguage = async () => {
  const newProductBtn = selectEl('.new-product');
  sessionStorage.getItem('api-product-list') ? page = parseInt(sessionStorage.getItem('api-product-list')) : page = 1;
  if (localStorage.getItem('language') === 'ar') {
    lang_ar.style.display = 'block';
    lang_en.style.display = 'none';
    lang_fr.style.display = 'none';
    
    // carousel items text
    carouselItem1.textContent = 'مرحبا بك';
    carouselItem2.textContent = 'تجد لدينا أفضل العروض';
    carouselItem3.textContent = 'التي تناسبك';
    newProductBtn ? newProductBtn.textContent = 'إضافة منتج جديد' : '';
    await fetchProducts('تخفيض','نفذ من المخزن','ar',home_products,fetchProductCard(url,page),'col-sm-6 col-md-4 col-lg-3');
  } else if (localStorage.getItem('language') === 'en') {
    lang_ar.style.display = 'none';
    lang_en.style.display = 'block';
    lang_fr.style.display = 'none';

    // carousel items text
    carouselItem1.textContent = 'WELCOME';
    carouselItem2.textContent = 'Find our best offers';
    carouselItem3.textContent = 'That suit you';
    newProductBtn ? newProductBtn.textContent = 'ADD NEW PRODUCT' : '';
    /* fetch english product start */
    await fetchProducts('SALE','STOCK OUT','en',home_products,fetchProductCard(url,page),'col-sm-6 col-md-4 col-lg-3');
    /* fetch english product end */
  } else if (localStorage.getItem('language') === 'fr') {
    lang_ar.style.display = 'none';
    lang_en.style.display = 'none';
    lang_fr.style.display = 'block';
    
    // carousel items text
    carouselItem1.textContent = 'BIENVENUE';
    carouselItem2.textContent = 'Trouvez nos meilleures offres';
    carouselItem3.textContent = 'Qui vous correspondent';
    newProductBtn ? newProductBtn.textContent = 'AJOUTER UN PRODUIT' : '';
    /* fetch france product start */
    await fetchProducts('SOLDE','FIN DE STOCK','fr',home_products,fetchProductCard(url,page),'col-sm-6 col-md-4 col-lg-3');
    /* fetch france product end */
  } else {
    localStorage.setItem('language','en');
  }
}
const storeTheme = () => {
  const products = Array.from(document.querySelectorAll('div.product-card'));
  const homeProfileInfo = document.querySelector('.home-profile-info');
  if (localStorage.getItem('theme-mood') === 'dark') {
    carousel.classList = "carousel dark";
    categoryList.map((el)=> el.classList = "category-list dark");
    homeProfileInfo ? homeProfileInfo.classList = 'home-profile-info dark': '';
    categoryIconDark.map((el)=> {
      el.style.display = 'block'
    })
    categoryIconLight.map((el)=> {
      el.style.display = 'none'
    })
    products ? products.map((el)=> el.classList = 'product-card dark') : '';
  } else {
    carousel.classList = "carousel light";
    homeProfileInfo ? homeProfileInfo.classList = 'home-profile-info': '';
    categoryList.map((el)=> el.classList = "category-list light");
    categoryIconDark.map((el)=> {
      el.style.display = 'none'
    })
    categoryIconLight.map((el)=> {
      el.style.display = 'block'
    })
    products ? products.map((el)=> el.classList = 'product-card light'): '';
  }
  chatRoomsTheme();
}

storeLanguage();
storeTheme();


