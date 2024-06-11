
themeSwitchBtn.onclick = () => {
  if (localStorage.getItem('theme-mood') === 'dark') {
    localStorage.setItem('theme-mood','light');
    category_list();
    theme()
  } else {
    localStorage.setItem('theme-mood','dark');
    category_list();
    theme()
  }
  user_info_theme();
}

ar.onclick = () => { // change lang to arabic
  localStorage.setItem('language','ar');
  user_info_language();
  category_list();
  language();
}
en.onclick = () => { // change lang to english
  localStorage.setItem('language','en');
  user_info_language();
  category_list();
  language();
}
fr.onclick = () => { // change lang to frensh
  localStorage.setItem('language','fr');
  user_info_language();
  category_list();
  language();
}
const card_form = selectEl('.card-form')
const user_info_language = () => {
  const success_message = selectEl('.success-message');
  const trans_num = selectEl('.trans_num');
  const card_form_title = selectEl('.card-form .card-title');
  const name = selectEl('.id_name');
  const address = selectEl('.id_address');
  const country = selectEl('.id_country');
  const city = selectEl('.id_city');
  const email = selectEl('.id_email');
  const phone = selectEl('.id_phone');
  const save_btn = selectEl('.save-btn');
  if (localStorage.getItem('language') === 'ar') {
    success_message.textContent = 'لقد تمت عملية الدفع بنجاح.';
    trans_num.textContent = 'رقم المعاملة هو: ';
    card_form_title.textContent = 'المرجو إدخال المعلومات التالية';
    name.textContent = 'الإسم';
    address.textContent = 'العنوان';
    country.textContent = 'البلد';
    city.textContent = 'المدينة';
    email.textContent = 'البريد الإلكتروني';
    phone.textContent = 'الهاتف';
    save_btn.textContent = 'حفظ';
  } else if (localStorage.getItem('language') === 'fr') {
    success_message.textContent = 'Votre paiement a été effectué avec succès.';
    trans_num.textContent = 'Le numéro de transaction est : ';
    card_form_title.textContent = 'Veuillez entrer les informations suivantes';
    name.textContent = 'Nom';
    address.textContent = 'Adresse';
    country.textContent = 'Pays';
    city.textContent = 'Ville';
    email.textContent = 'E-mail';
    phone.textContent = 'Téléphone';
    save_btn.textContent = 'ENREGISTRER';
  } else {
    success_message.textContent = 'Your payment has been completed successfully.';
    trans_num.textContent = 'The transaction number is: ';
    card_form_title.textContent = 'Please enter the following information';
    name.textContent = 'Name';
    address.textContent = 'Address';
    country.textContent = 'Country';
    city.textContent = 'City';
    email.textContent = 'Email';
    phone.textContent = 'Phone';
    save_btn.textContent = 'SAVE';
  }
}
const user_info_theme = () => {
  if (localStorage.getItem('theme-mood') === 'dark') {
    card_form.classList.add('dark');
  } else {
    card_form.classList.remove('dark');
  }
}
user_info_language();
user_info_theme();