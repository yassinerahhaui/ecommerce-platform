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
  password_change_theme();
}

ar.onclick = () => { // change lang to arabic
  localStorage.setItem('language','ar');
  password_change_language();
  category_list();
  language();
}
en.onclick = () => { // change lang to english
  localStorage.setItem('language','en');
  password_change_language();
  category_list();
  language();
}
fr.onclick = () => { // change lang to frensh
  localStorage.setItem('language','fr');
  password_change_language();
  category_list();
  language();
}

const password_change_language = () => {
  const card_form_title = selectEl('.card-form .card-title');
  const old_password = selectEl('.id_old_password');
  const new_password1 = selectEl('.id_new_password1');
  const new_password2 = selectEl('.id_new_password2');
  const change_password_btn = selectEl('.change_password_btn');
  const text_help = selectEl('.card-form .card-body form ul');
  const success_message = selectEl('.success-message');
  if (localStorage.getItem('language') === 'ar') {
    card_form_title ? card_form_title.textContent = 'تغيير كلمة المرور': '';
    old_password ? old_password.textContent = 'كلمة المرور القديمة':'';
    new_password1 ? new_password1.textContent = 'كلمة المرور الجديدة':'';
    text_help ? text_help.innerHTML = `<li>لا يمكن أن تكون كلمة مرورك مشابهة جدًا لمعلوماتك الشخصية الأخرى.</li>
      <li>يجب أن تحتوي كلمة المرور الخاصة بك على 8 أحرف على الأقل.</li>
      <li>لا يمكن أن تكون كلمة المرور الخاصة بك كلمة مرور شائعة الاستخدام.</li>
      <li>لا يمكن أن تكون كلمة مرورك رقمية بالكامل.</li>`:'';
    new_password2 ? new_password2.textContent = 'تأكيد كلمة المرور الجديدة':'';
    change_password_btn ? change_password_btn.value = 'تغيير':'';
    success_message ? success_message.textContent = 'لقد تم تغيير كلمة المرور بنجاح.':'';
  } else if (localStorage.getItem('language') === 'fr') {
    card_form_title ? card_form_title.textContent = 'CHANGER LE MOT DE PASS':'';
    old_password ? old_password.textContent = 'ancien mot de passe':'';
    new_password1 ? new_password1.textContent = 'nouveau mot de passe': '';
    text_help ? text_help.innerHTML = `<li>Votre mot de passe ne doit pas être trop similaire à vos autres informations personnelles.</li>
      <li>Votre mot de passe doit contenir au moins 8 caractères.</li>
      <li>Votre mot de passe ne peut pas être un mot de passe couramment utilisé.</li>
      <li>Votre mot de passe ne peut pas être entièrement numérique.</li>`:'';
    new_password2 ? new_password2.textContent = 'confirmer le nouveau mot de passe':'';
    change_password_btn ? change_password_btn.value = 'CHANGER':'';
    success_message ? success_message.textContent = 'Le mot de passe a été changé avec succès.':'';
  } else {
    card_form_title ? card_form_title.textContent = 'PASSWORD CHANGE':'';
    old_password ? old_password.textContent = 'old password':'';
    new_password1 ? new_password1.textContent = 'new password':'';
    text_help ? text_help.innerHTML = `<li>Your password can’t be too similar to your other personal information.</li>
      <li>Your password must contain at least 8 characters.</li>
      <li>Your password can’t be a commonly used password.</li>
      <li>Your password can’t be entirely numeric.</li>`:'';
    new_password2 ? new_password2.textContent = 'confirm new password':'';
    change_password_btn ? change_password_btn.value = 'CHANGE':'';
    success_message ? success_message.textContent = 'The password has been changed successfully.':'';
  }
}
const password_change_theme = () => {
  if (localStorage.getItem('theme-mood') === 'dark') {
    card_form ? card_form.classList.add('dark'):'';
  } else {
    card_form ? card_form.classList.remove('dark'):'';
  }
}
password_change_theme();
password_change_language();