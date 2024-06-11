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
  chatRoomsTheme();
  password_reset_theme();
}

ar.onclick = () => { // change lang to arabic
  localStorage.setItem('language','ar');
  password_reset_language();
  category_list();
  language();
}
en.onclick = () => { // change lang to english
  localStorage.setItem('language','en');
  password_reset_language();
  category_list();
  language();
}
fr.onclick = () => { // change lang to frensh
  localStorage.setItem('language','fr');
  password_reset_language();
  category_list();
  language();
}

const password_reset_language = () => {
  const password_reset_title = selectEl('.card-form .card-title')
  const email = selectEl('.id_email');
  const reset_btn = selectEl('.reset-btn');
  const success_message = selectEl('.success-message');
  if (localStorage.getItem('language') === 'ar') {
    password_reset_title ? password_reset_title.textContent = 'إعادة تعيين كلمة المرور' : '';
    email ? email.textContent = 'البريد الإلكتروني' : '';
    reset_btn ? reset_btn.value = 'حفظ':'';
    success_message ? success_message.textContent = "لقد أرسلنا إليك عبر البريد الإلكتروني تعليمات حول تعيين كلمة المرور الخاصة بك. إذا لم يصلوا خلال بضع دقائق ، فتحقق من مجلد الرسائل الغير مرغوب فيها." : '';
  } else if (localStorage.getItem('language') === 'fr') {
    password_reset_title ? password_reset_title.textContent = 'RÉINITIALISER LE MOT DE PASSE' : '';
    email ? email.textContent = 'E-mail' : '';
    reset_btn ? reset_btn.value = 'ENREGISTRER':'';
    success_message ? success_message.textContent = "Nous vous avons envoyé par e-mail des instructions pour définir votre mot de passe. S'ils ne sont pas arrivés dans quelques minutes, vérifiez votre dossier spam." : '';
  } else {
    password_reset_title ? password_reset_title.textContent = 'RESET PASSWORD' : '';
    email ? email.textContent = 'Email' : '';
    reset_btn ? reset_btn.value = 'SAVE':'';
    success_message ? success_message.textContent = "We've emailed you instructions for setting your password. If they haven't arrived in a few minutes, check your spam folder." : '';
  }
}
const password_reset_theme = () => {
  if (localStorage.getItem('theme-mood') === 'dark') {
    card_form ? card_form.classList.add('dark'):'';
  } else {
    card_form ? card_form.classList.remove('dark'):'';
  }
}
password_reset_theme();
password_reset_language();