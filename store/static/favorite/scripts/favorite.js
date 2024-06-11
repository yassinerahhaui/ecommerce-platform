const card_favorite = document.querySelector('.card-favorite')
const product_card_favorite = document.querySelector('.product-card-favorite');
const favorite_title = document.querySelector('.favorite-title');

let page;
sessionStorage.getItem('favorite-list') ? page = parseInt(sessionStorage.getItem('favorite-list')) : page = 1;

let url = `${siteName}/favorite/list?page=`;
const paginationBox = document.querySelector('.pagination-box');

pagination(paginationBox,product_card_favorite,fetchProductCard(url,page),'favorite-list','col-sm-6 col-md-4 col-lg-3');

const favorite = async () => {
  sessionStorage.getItem('favorite-list') ? page = parseInt(sessionStorage.getItem('favorite-list')) : page = 1;
  if (localStorage.getItem('language') === 'ar') {
    favorite_title.textContent = 'المنتجات المفضلة';
    await fetchProducts('تخفيض','نفذ من المخزن','ar',product_card_favorite,fetchProductCard(url,page),'col-sm-6 col-md-4 col-lg-3');
  } else if (localStorage.getItem('language') === 'fr') {
    favorite_title.textContent = 'Produits Préférés';
    await fetchProducts('SOLDE','FIN DE STOCK','fr',product_card_favorite,fetchProductCard(url,page),'col-sm-6 col-md-4 col-lg-3');
  } else {
    favorite_title.textContent = 'Products Favorite';
    await fetchProducts('SALE','STOCK OUT','en',product_card_favorite,fetchProductCard(url,page),'col-sm-6 col-md-4 col-lg-3');
  }
}
const favorite_theme = () => {
  if (localStorage.getItem('theme-mood') === 'dark') {
    card_favorite.classList = 'card rounded card-favorite dark';
  } else {
    card_favorite.classList = 'card rounded card-favorite light';
  }
}

ar.onclick = () => { // change lang to arabic
  localStorage.setItem('language','ar');
  favorite();
  category_list();
  language();
}
en.onclick = () => { // change lang to english
  localStorage.setItem('language','en');
  favorite();
  category_list();
  language();
}
fr.onclick = () => { // change lang to frensh
  localStorage.setItem('language','fr');
  favorite();
  category_list();
  language();
}

themeSwitchBtn.onclick = () => {
  if (localStorage.getItem('theme-mood') === 'dark') {
    localStorage.setItem('theme-mood','light');
  } else {
    localStorage.setItem('theme-mood','dark');
  }
  favorite_theme();
  category_list();
  theme();
  chatRoomsTheme();
}


favorite_theme();
favorite();
