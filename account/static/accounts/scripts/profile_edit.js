let page = 1;
sessionStorage.getItem(`api-product-profile`) ? page = parseInt(sessionStorage.getItem(`api-product-profile`)) : page = 1;
let url = `${siteName}/accounts/profile/products?page=`;
const profile_products = document.querySelector('div.profile-products');
const editProfileBTN = document.querySelector('.edit-button');
const paginationProfile = document.querySelector('.pagination-box-profile');
const profileInfo = selectEl('.profile-edit-info');
const newProductButton = document.querySelector('.new-product-button__text');
const infoTitle = selectEl('.profile-info-title');
const infoBody = selectEl('.info-card-body');
infoTitle.addEventListener('click', () => {
  if (infoBody.style.maxHeight === '950px') {
    infoBody.style.maxHeight = '0px';
    infoBody.style.padding = '0px'
  } else {
    infoBody.style.maxHeight = '950px';
    infoBody.style.padding = '10px'
  }
})

fetchProductCard(url,page);
pagination(paginationProfile,profile_products,fetchProductCard(url,page),`api-product-profile`,'col-sm-6 col-md-6 col-lg-4 col-xl-3');
themeSwitchBtn.onclick = () => {
  if (localStorage.getItem('theme-mood') === 'dark') {
    localStorage.setItem('theme-mood','light');
  } else {
    localStorage.setItem('theme-mood','dark');
  }
  profileTheme();
  category_list();
  theme()
  chatRoomsTheme();
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

const profileLanguage = async () => {
    sessionStorage.getItem(`api-product-profile`) ? page = parseInt(sessionStorage.getItem(`api-product-profile`)) : page = 1;
    const language = localStorage.getItem('language');
    const infoTitle = selectEl('.profile-info-title');
    const profileImg = selectEl('.image-profile-edit');
    const profileCover = selectEl('.cover-profile-edit');
    const username = selectEl('.username-profile-edit');
    const firstName = selectEl('.first_name-profile-edit');
    const lastName = selectEl('.last_name-profile-edit');
    const email = selectEl('.email-profile-edit');
    const phone = selectEl('.phone-profile-edit');
    const gender = selectEl('.gender-profile-edit');
    const age = selectEl('.age-profile-edit');
    const country = selectEl('.country-profile-edit');
    const city = selectEl('.city-profile-edit');
    const address = selectEl('.address-profile-edit');
    const brand = selectEl('.brand-profile-edit');
    if (language === 'ar') {
      newProductButton.textContent = 'إضافة منتج جديد';
      infoTitle.textContent = 'معلومات المستخدم';
      profileImg.textContent = 'صورة الملف الشخصي:';
      profileCover.textContent = 'صورة الغلاف:';
      username.textContent = 'اسم المستخدم:';
      firstName.textContent = 'الاسم الاول:';
      lastName.textContent = 'اسم العائلة:';
      email.textContent = 'البريد الإلكتروني:';
      phone.textContent = 'رقم الهاتف:';
      gender.textContent = 'جنس:';
      age.textContent = 'العمر:';
      country.textContent = 'البلد:';
      city.textContent = 'المدينة';
      address.textContent = 'العنوان:';
      brand.textContent = 'العلامة التجارية:';
      editProfileBTN.textContent = 'حفظ';
      await fetchProducts('تخفيض','نفذ من المخزن','ar',profile_products,fetchProductCard(url,page),'col-sm-6 col-lg-4 col-xl-3');
    } else if (language === 'en') {
      newProductButton.textContent = 'ADD NEW PRODUCT';
      infoTitle.textContent = 'USER INFO';
      profileImg.textContent = 'Profile Image:';
      profileCover.textContent = 'Profile Cover:';
      username.textContent = 'Username:';
      firstName.textContent = 'First Name:';
      lastName.textContent = 'Last Name:';
      email.textContent = 'Email:';
      phone.textContent = 'Phone Number:';
      gender.textContent = 'Gender:';
      age.textContent = 'Age:';
      country.textContent = 'Country:';
      city.textContent = 'City:';
      address.textContent = 'Address:';
      brand.textContent = 'Brand:';
      editProfileBTN.textContent = 'SAVE';
      await fetchProducts('SALE','STOCK OUT','en',profile_products,fetchProductCard(url,page),'col-sm-6 col-lg-4 col-xl-3');
    } else if (language === 'fr') {
      newProductButton.textContent = 'AJOUTER UN NOUVEAU PRODUIT';
      infoTitle.textContent = 'INFORMATIONS UTILISATEUR';
      profileImg.textContent = 'Image de profil :';
      profileCover.textContent = 'Image de couverture:';
      username.textContent = 'Nom d\'utilisateur:';
      firstName.textContent = 'Prénom:';
      lastName.textContent = 'Nom:';
      email.textContent = 'E-mail';
      phone.textContent = 'Numéro de téléphone:';
      gender.textContent = 'Le genre:';
      age.textContent = 'âge:';
      country.textContent = 'Le pays:';
      city.textContent = 'La ville:';
      address.textContent = 'L\'adresse:';
      brand.textContent = 'La marque:';
      editProfileBTN.textContent = 'ENREGISTRER';
      await fetchProducts('SOLDE','FIN DE STOCK','fr',profile_products,fetchProductCard(url,page),'col-sm-6 col-lg-4 col-xl-3');
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
        noProductTitle.textContent = 'لا توجد منتجات في هذه الصفحة!';
      } else if (localStorage.getItem('language') === 'fr') {
        noProductTitle.textContent = 'Aucun produit sur cette page !';
      } else {
        noProductTitle.textContent = 'No Products In This Page!';
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
        editProfileBTN.classList = 'edit-button btn btn-lg btn-success border border-2 fw-bold fs-4 border-light rounded w-100 mb-3';
        setClass(profileInfo,'card profile-edit-info dark');
    } else {
        products.map((el)=> el.classList = 'product-card light');
        editProfileBTN.classList = 'edit-button btn btn-lg btn-success border border-2 fw-bold fs-4 border-dark rounded w-100 mb-3';
        setClass(profileInfo,'card profile-edit-info light');
    }
}
profileTheme();
