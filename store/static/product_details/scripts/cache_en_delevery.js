const cache_en_delevery_btn = selectEl('.cache-en-delevery-btn');
const cash_on_delivery_bg = selectEl('.cash-on-delivery-bg');
const cash_on_delivery = selectEl('.cash-on-delivery-card');
const cash_on_delivery_card = selectEl('.cash-on-delivery-card .card');
const card_title = selectEl('.cash-on-delivery-card .card .card-title');

cash_on_delivery_bg ? cash_on_delivery_bg.onclick = () => {
  cash_on_delivery_bg.style.display = 'none';
  cash_on_delivery.style.display = 'none';
} :'';
cache_en_delevery_btn ? cache_en_delevery_btn.onclick = () => {
  cash_on_delivery_bg.style.display = 'block';
  cash_on_delivery.style.display = 'block';
} : '';

const cache_en_delevery_language = () => {
  const name = selectEl('.id_name'),address = selectEl('.id_address'),country = selectEl('.id_country'),
  city = selectEl('.id_city'),email = selectEl('.id_email'),phone = selectEl('.id_phone');
  if (localStorage.getItem('language') === 'ar') {
    cache_en_delevery_btn ? cache_en_delevery_btn.textContent = 'الدفع عند الاستلام':'';
    card_title ? card_title.textContent = 'أدخل المعلومات الخاصة بك':'';
    name ? name.textContent = 'الإسم':'';
    address ? address.textContent = 'العنوان':'';
    country ? country.textContent = 'البلد':'';
    city ? city.textContent = 'المدينة': '';
    email ? email.textContent = 'البريد الإلكتروني':'';
    phone ? phone.textContent = 'رقم الهاتف':'';
  } else if (localStorage.getItem('language') === 'fr') {
    cache_en_delevery_btn ? cache_en_delevery_btn.textContent = 'PAIEMENT À LA LIVRAISON':'';
    card_title ? card_title.textContent = 'ENTREZ VOS INFORMATIONS':'';
    name ? name.textContent = 'Nom':'';
    address ? address.textContent = 'Adresse':'';
    country ? country.textContent = 'Pays':'';
    city ? city.textContent = 'Ville':'';
    email ? email.textContent = 'E-mail':'';
    phone ? phone.textContent = 'Téléphone':'';
  } else {
    cache_en_delevery_btn ? cache_en_delevery_btn.textContent = 'CASH ON DELIVERY':'';
    card_title ? card_title.textContent = 'ENTER YOUR INFO':'';
    name ? name.textContent = 'Name':'';
    address ? address.textContent = 'Address':'';
    country ? country.textContent = 'Country':'';
    city ? city.textContent = 'City':'';
    email ? email.textContent = 'Email':'';
    phone ? phone.textContent = 'Phone':'';
  }
}

const cache_en_delevery_theme = () => {
  if (localStorage.getItem('theme-mood') === 'dark') {
    cash_on_delivery_card ? cash_on_delivery_card.classList.add('dark'):'';
  } else {
    cash_on_delivery_card ? cash_on_delivery_card.classList.remove('dark'):'';
  }
}
cache_en_delevery_theme();
cache_en_delevery_language();