const card_form = selectEl('.card-form')
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
  // chatRoomsTheme();
  password_reset_confirm_theme();
}

ar.onclick = () => { // change lang to arabic
  localStorage.setItem('language','ar');
  password_reset_confirm_language();
  category_list();
  language();
}
en.onclick = () => { // change lang to english
  localStorage.setItem('language','en');
  password_reset_confirm_language();
  category_list();
  language();
}
fr.onclick = () => { // change lang to frensh
  localStorage.setItem('language','fr');
  password_reset_confirm_language();
  category_list();
  language();
}
const password_reset_confirm_language = () => {
  const success_title = selectEl('.success-title');
  const login_link = selectEl('.login-link')
  const card_form_title = selectEl('.card-form .card-title');
  const new_password = selectEl('.id_new_password1');
  const confirm_password = selectEl('.id_new_password2');
  const reset_btn = selectEl('.reset-btn');
  if (localStorage.getItem('language') === 'ar') {
    success_title ? success_title.textContent = 'تم تغيير كلمة السر!' : '';
    login_link ? login_link.textContent = 'تسجيل الدخول مرة أخرى؟': '';
    card_form_title ? card_form_title.textContent = 'أدخل كلمة مرور جديدة' : '';
    new_password ? new_password.textContent = 'كلمة المرور الجديدة': '';
    confirm_password ? confirm_password.textContent = 'تأكيد كلمة المرور' : '';
    reset_btn ? reset_btn.value = 'تغيير' : '';
  } else if (localStorage.getItem('language') === 'fr') {
    success_title ? success_title.textContent = 'Le mot de passe a été changé !' : '';
    login_link ? login_link.textContent = 'se reconnecter ?': '';
    card_form_title ? card_form_title.textContent = 'NOUVEAU MOT DE PASSE' : '';
    new_password ? new_password.textContent = 'Nouveau mot de pass': '';
    confirm_password ? confirm_password.textContent = 'Confirmez le mot de passe' : '';
    reset_btn ? reset_btn.value = 'CHANGER' : '';
  } else {
    success_title ? success_title.textContent = 'The password has been changed!' : '';
    login_link ? login_link.textContent = 'log in again?': '';
    card_form_title ? card_form_title.textContent = 'ENTER NEW PASSWORD' : '';
    new_password ? new_password.textContent = 'New password': '';
    confirm_password ? confirm_password.textContent = 'Confirm password' : '';
    reset_btn ? reset_btn.value = 'CHANGE' : '';
  }

}
const password_reset_confirm_theme = () => {
  if (localStorage.getItem('theme-mood') === 'dark') {
    card_form ? card_form.classList.add('dark'):'';
  } else {
    card_form ? card_form.classList.remove('dark'):'';
  }
}
password_reset_confirm_theme();
password_reset_confirm_language();