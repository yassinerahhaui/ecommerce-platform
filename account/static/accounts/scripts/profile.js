const myid = parseInt(window.location.href.toString().split('/').slice(-1));
const productContainer = document.querySelector('.profile-products');
let page = 1
sessionStorage.getItem(`api-product-profile-${myid}`) ? page = parseInt(sessionStorage.getItem(`api-product-profile-${myid}`)) : page = 1;
const url = `${siteName}/accounts/profile/products/${myid}?page=`;
const profile_products = document.querySelector('div.profile-products');
const paginationProfile = document.querySelector('.pagination-box-profile');

fetchProductCard(url,page);
pagination(paginationProfile,profile_products,fetchProductCard(url,page),`api-product-profile-${myid}`,'col-md-6 col-lg-4 col-xl-3');

themeSwitchBtn.onclick = () => {
  if (localStorage.getItem('theme-mood') === 'dark') {
    localStorage.setItem('theme-mood','light');
  } else {
    localStorage.setItem('theme-mood','dark');
  }
  profileTheme();
  category_list();
  theme();
}


ar.onclick = () => { // change lang to arabic
localStorage.setItem('language','ar');
	profileLanguage();
  category_list();
	language();
}
en.onclick = () => { // change lang to english
localStorage.setItem('language','en');
	profileLanguage();
  category_list();
	language();
}
fr.onclick = () => { // change lang to frensh
localStorage.setItem('language','fr');
	profileLanguage();
  category_list();
	language();
}


const cardInfo = selectEl('.profile-info');
const cardTitleInfo = selectEl('.profile-info h1.card-title');
const cardBodyInfo = selectEl('.user-card-body')
const userTitle = selectEl('h1.user-title');
cardTitleInfo.addEventListener('click',()=> {
  if (cardBodyInfo.style.maxHeight === '700px') {
    cardBodyInfo.style.maxHeight = '0px';
    cardBodyInfo.style.padding = '0px';
  } else {
    cardBodyInfo.style.maxHeight = '700px';
    cardBodyInfo.style.padding = '10px';
  }
})

const profileLanguage = async () => {
  sessionStorage.getItem(`api-product-profile-${myid}`) ? page = parseInt(sessionStorage.getItem(`api-product-profile-${myid}`)) : page = 1;
  const language = localStorage.getItem('language');
  const name = selectEl('b.info-name');
  const phone = selectEl('b.info-phone');
  const gender = selectEl('b.info-gender');
  const age = selectEl('b.info-age');
  const country = selectEl('b.info-country');
  const city = selectEl('b.info-city');
  const address = selectEl('b.info-address');
  // const bio = document.querySelector('b.info-bio');
  if (language === 'ar') {
    await fetchProducts('تخفيض','نفذ من المخزن','ar',profile_products,fetchProductCard(url,page),'col-md-6 col-lg-4 col-xl-3');
    // noproducts.textContent = `لا يوجد منتجات في هذا الحساب!`;
    userTitle.textContent = 'معلومات المستخدم';
    name ? name.textContent = 'الإسم: ':'';
    phone ? phone.textContent = 'الهاتف: ':'';
    gender ? gender.textContent = 'الجنس: ':'';
    age ? age.textContent = 'العمر: ':'';
    country ? country.textContent = 'البلد: ':'';
    city ? city.textContent = 'المدينة: ':'';
    address ? address.textContent = 'العنوان: ':'';
  } else if (language === 'en') {
    await fetchProducts('SALE','STOCK OUT','en',profile_products,fetchProductCard(url,page),'col-md-6 col-lg-4 col-xl-3');
    // noproducts.textContent = `There are no products in this account!`;
    userTitle.textContent = 'USER INFO';
    name ? name.textContent = 'Name: ':'';
    phone ? phone.textContent = 'Phone: ':'';
    gender ? gender.textContent = 'Gender: ':'';
    age ? age.textContent = 'Age: ':'';
    country ? country.textContent = 'Country: ':'';
    city ? city.textContent = 'City: ':'';
    address ? address.textContent = 'Address: ':'';
  } else if (language === 'fr') {
    await fetchProducts('SOLDE','FIN DE STOCK','fr',profile_products,fetchProductCard(url,page),'col-md-6 col-lg-4 col-xl-3');
    // noproducts.textContent = `Il n'y a aucun produit dans ce compte!`;
    userTitle.textContent = 'INFORMATIONS UTILISATEUR';
    name ? name.textContent = 'Nom: ':'';
    phone ? phone.textContent = 'Téléphone: ':'';
    gender ? gender.textContent = 'Le genre: ':'';
    age ? age.textContent = 'âge: ':'';
    country ? country.textContent = 'Pays: ':'';
    city ? city.textContent = 'Ville: ':'';
    address ? address.textContent = 'Adresse: ':'';
  } else {
    localStorage.setItem('language','en')
  }
  if (profile_products.textContent === '') {
    const contain = createEl('div');
    const noProduct = createEl('div');
    const noProductTitle = createEl('p');
    setClass(contain,'container');
    setClass(noProduct,'alert alert-dark');
    setClass(noProductTitle,'fs-1 fw-bold text-center');
    if (localStorage.getItem('language') === 'ar') {
      noProductTitle.textContent = 'لا توجد منتجات في هذا الحساب!';
    } else if (localStorage.getItem('language') === 'fr') {
      noProductTitle.textContent = 'Aucun produit dans ce compte !';
    } else {
      noProductTitle.textContent = 'No Products In This Account!';
    }
    setChild(noProduct,noProductTitle);
    setChild(contain,noProduct);
    setChild(profile_products,contain);
  }
}
profileLanguage();

const profileTheme = () => {
    const products = Array.from(document.querySelectorAll('div.product-card'));
    if (localStorage.getItem('theme-mood') === 'dark') {
        products.map((el)=> el.classList = 'product-card dark');
        // noproducts.classList = 'alert alert-dark text-center bg-dark text-light fs-1 fw-bold border border-3 border-light';
        cardInfo.classList = 'profile-info card dark';
        cardTitleInfo.classList = 'card-title text-center p-2 user-title dark';
    } else {
        products.map((el)=> el.classList = 'product-card light');
        // noproducts.classList = 'alert alert-dark text-center bg-secondary text-dark fs-1 fw-bold border border-3 border-dark';
        cardInfo.classList = 'profile-info card light';
        cardTitleInfo.classList = 'card-title text-center p-2 user-title light';
    }
    chatRoomsTheme();
}
profileTheme();


