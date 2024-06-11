
/* navigation drawer start */
const navBgDark = document.querySelector('.nav-bg-dark');
const navCloseBtn = document.querySelector('.drawer-close');
const navLIst = document.querySelector('.nav-list');
const drawerButton = document.querySelector('.menu-button');



navBgDark.onclick = () => {
  navLIst.style.left = '-250px';
  navBgDark.style.display = 'none';
  setTimeout(()=> navLIst.style.display= 'none',300);
}
navCloseBtn.onclick = () => {
  navLIst.style.left = '-250px';
  navBgDark.style.display = 'none';
  setTimeout(()=> navLIst.style.display= 'none',300);
}
drawerButton.onclick = () => {
  navLIst.style.display = 'block';
  setTimeout(()=> navLIst.style.left ='0',100);
  navBgDark.style.display = 'block';
}
/* navigation drawer end */


/* theme mood start */

const themeSwitchBtn = document.querySelector('.sun'); // select switch button
const navlist = document.querySelector('aside.nav-list'); // select navigation list


let themeMood = localStorage.getItem('theme-mood'); 
themeSwitchBtn.style.cursor = 'pointer';
document.body.classList = themeMood;
navlist.classList = `nav-list ${themeMood}`; // navigation list theme
const chatRoomsTheme = () => {
  if (localStorage.getItem('theme-mood') === 'light') {
    chatRooms.style.backgroundColor = '#fff';
    chatRoomBox.style.backgroundColor = '#fff';
  } else {
    chatRooms.style.backgroundColor = '#000';
    chatRoomBox.style.backgroundColor = '#000';
  }
}
chatRooms ? chatRoomsTheme() : '';

themeSwitchBtn.onclick = () => {
  if (localStorage.getItem('theme-mood') === 'dark') {
    localStorage.setItem('theme-mood','light');
    category_list();
    theme();
  } else {
    localStorage.setItem('theme-mood','dark');
    category_list();
    theme();
  }
  chatRoomsTheme();
}
const loginCard = document.querySelector('.login-card');

const loginCardTitle = document.querySelector('.login-card-title');
const loginCardEmail = document.querySelector('.login-email');
const loginCardPassword = document.querySelector('.login-password');
const inputDir = Array.from(document.querySelectorAll('.inputDir'));
const submitButton = document.querySelector('.btn-login-card');
const forgetPassword = document.querySelector('a.forget-password');
const orCard = document.querySelector('span.or');
const registerCardLink = document.querySelector('a.register');
const toolbar = selectEl('.toolbar')

const theme = () => {
  if (localStorage.getItem('theme-mood') === 'dark') {
    document.body.classList = 'dark';
    toolbar.classList = 'toolbar dark';
    navlist.classList = `nav-list dark`;

    loginCard ? loginCard.classList.add('dark'): '';
    loginCard ? loginCard.classList.remove('light'): '';
  } else {
    localStorage.setItem('theme-mood','light');
    document.body.classList = 'light';
    toolbar.classList = 'toolbar';
    navlist.classList = `nav-list light`; 

    loginCard ? loginCard.classList.add('light'): '';
    loginCard ? loginCard.classList.remove('dark'):'';
  }
}

theme()

/* theme mood end */


/* language start */
const searchBar = document.querySelector('#search-bar');
const content = document.querySelector('div#content');


// select language button /3
const ar = document.querySelector('#ar');
const en = document.querySelector('#en');
const fr = document.querySelector('#fr');

// style language cursor button /3 
ar.style.cursor = 'pointer';
en.style.cursor = 'pointer';
fr.style.cursor = 'pointer';

const logoutBTN = document.querySelector('.logout.nav .sign-out');
const loginNavLink = document.querySelector('.nav-list-profile__login .text');
const orNav = document.querySelector('.nav-list-profile__or');
const signupNavLink = document.querySelector('.nav-list-profile__signup .text');
// change site language function
const language = () => {
  const htmlLang = document.getElementById('html');
  const dashboard = selectEl('.nav-list__links .dashboard span');
  const dashboard_a = selectEl('.nav-list__links .dashboard');
  const languageBtnNav = selectEl('.nav-list__links .language');
  const languageBtnNavText = selectEl('.nav-list__links .language span');
  const languageSwitchBox = selectEl('.switch-language');
  const themeBtnNav = selectEl('.nav-list__links .theme')
  const themeBtnNavText = selectEl('.nav-list__links .theme span')
  
  if (localStorage.getItem('language') === 'ar') {
    htmlLang.lang = 'ar';
    searchBar.placeholder = 'البحث عن منتج أو باقة...';
    searchBar.style.direction = 'rtl';
    content.style.direction = 'rtl';
    /* login form start */
    loginCardTitle ? loginCardTitle.textContent = 'تسجيل الدخول': ''; // home login card title
    loginCardEmail ? loginCardEmail.textContent = 'عنوان البريد الإلكتروني': '';// home login form label
    loginCardPassword ? loginCardPassword.textContent = 'كلمة المرور': '';// home login form label
    submitButton ? submitButton.textContent = 'دخول': ''; // home login form button
    forgetPassword ? forgetPassword.textContent = 'نسيت كلمة المرور?': '';
    orCard ? orCard.textContent = 'أو': '';
    registerCardLink ? registerCardLink.textContent = 'تسجيل حساب جديد': '';
    /* login form end */
    loginNavLink ? loginNavLink.textContent = 'الدخول' : '';
    orNav ? orNav.textContent = 'أو' : '';
    signupNavLink ? signupNavLink.textContent = 'تسجيل' : '';
    logoutBTN ? logoutBTN.textContent = 'تسجيل الخروج': '';
    dashboard ? dashboard.textContent = 'لوحة التحكم' : '';
    dashboard_a ? dashboard_a.style.justifyContent = 'space-between': '';
    languageBtnNavText.textContent = 'اللغة';
    languageBtnNav.style.justifyContent = 'space-between';
    themeBtnNavText.textContent = 'الخلفية';
    themeBtnNav.style.justifyContent = 'space-between';
  } else if (localStorage.getItem('language') === 'en') {
    htmlLang.lang = 'en';
    searchBar.placeholder = 'Search Product Or Collection...';
    searchBar.style.direction = 'ltr';
    content.style.direction = 'ltr';
    /* login form start */
    loginCardTitle ? loginCardTitle.textContent = 'LOGIN': ''; // home login card title
    loginCardEmail ? loginCardEmail.textContent = 'Email address': ''; // home login form label
    loginCardPassword ? loginCardPassword.textContent = 'Password': ''; // home login form label
    submitButton ? submitButton.textContent = 'SUBMIT': ''; // home login form button
    forgetPassword ? forgetPassword.textContent = 'Forgotten password?': ''; //
    orCard ? orCard.textContent = 'OR': ''; //
    registerCardLink ? registerCardLink.textContent = 'Register': ''; //
    /* login form end */
    logoutBTN ? logoutBTN.textContent = 'Sign out': '';
    loginNavLink ? loginNavLink.textContent = 'Login' : '';
    orNav ? orNav.textContent = '/' : '';
    signupNavLink ? signupNavLink.textContent = 'Register' : '';
    dashboard ? dashboard.textContent = 'dashboard' : '';
    dashboard_a ? dashboard_a.style.justifyContent = 'left': '';
    languageBtnNavText.textContent = 'Language';
    languageBtnNav.style.justifyContent = 'left';
    themeBtnNavText.textContent = 'Theme';
    themeBtnNav.style.justifyContent = 'left';
  } else if (localStorage.getItem('language') === 'fr') {
    htmlLang.lang = 'fr';
    searchBar.placeholder = 'Rechercher un produit ou une collection...';
    searchBar.style.direction = 'ltr';
    content.style.direction = 'ltr';

    /* login form start */
    loginCardTitle ? loginCardTitle.textContent = 'CONNEXION':''; // home login card title
    loginCardEmail ? loginCardEmail.textContent = 'Adresse e-mail':''; // home login form label
    loginCardPassword ? loginCardPassword.textContent = 'le mot de passe':'';// home login form label
    submitButton ? submitButton.textContent = 'ENTRER': ''; // home login form button

    forgetPassword ? forgetPassword.textContent = 'Mot de passe oublié?': '';
    orCard ? orCard.textContent = 'OU' : '';
    registerCardLink ? registerCardLink.textContent = "S'inscrire": '';
    /* login form end */
    logoutBTN ? logoutBTN.textContent = 'Se déconnecter': '';
    loginNavLink ? loginNavLink.textContent = 'Connecter' : '';
    orNav ? orNav.textContent = '/' : '';
    signupNavLink ? signupNavLink.textContent = "Inscrire" : '';
    dashboard ? dashboard.textContent = 'tableau de bord' : '';
    dashboard_a ? dashboard_a.style.justifyContent = 'left':'';
    languageBtnNavText.textContent = 'La Langue';
    languageBtnNav.style.justifyContent = 'left';
    themeBtnNavText.textContent = 'Thème';
    themeBtnNav.style.justifyContent = 'left';
  } else {
    localStorage.setItem('language','en');
  }
  languageBtnNav.onclick = ()=> {
    if (languageSwitchBox.style.height === '120px') {
      languageSwitchBox.style.height = '0px';
      languageSwitchBox.style.borderBottom = 'none';
    } else {
      languageSwitchBox.style.height = '120px';
      languageSwitchBox.style.borderBottom = '1px solid grey';
    }
  }
}
language()
const shopCart = JSON.parse(localStorage.getItem('shopping-cart'));
const shop_cart_a = document.querySelector('a.shopping-cart');
const shopNum = document.querySelector('.shop-num');
const shopCartBadge = document.querySelector('.shopping-cart__badge');
shopCart ? shopNum.textContent = `+${shopCart.length}` : shop_cart_a.removeChild(shopCartBadge);


/* language end */


