const newProductBox = selectEl('.new-product-box');
const newProductDetails = selectEl('.new-product-details')
const hideForm = selectEl('.hide-form');
const showForm = selectEl('.show-form');
hideForm.title = 'hide form.';
showForm.title = 'show form.';

ar.onclick = () => { // change lang to arabic
  localStorage.setItem('language','ar');
  newProductLanguage();
  newProductResult();
  colorsFunc();
  sizesFunc();
  category_list();
  language();
}
en.onclick = () => { // change lang to english
  localStorage.setItem('language','en');
  newProductLanguage();
  newProductResult();
  colorsFunc();
  sizesFunc();
  category_list();
  language();
}
fr.onclick = () => { // change lang to frensh
  localStorage.setItem('language','fr');
  newProductLanguage();
  newProductResult();
  colorsFunc();
  sizesFunc();
  category_list();
  language();
}


themeSwitchBtn.onclick = () => {
  if (localStorage.getItem('theme-mood') === 'dark') {
    localStorage.setItem('theme-mood','light');
  } else {
    localStorage.setItem('theme-mood','dark');
  }
  sizesFunc();
  category_list();
  theme()
  newProductFormTheme();
  chatRoomsTheme();
}
const new_product_form = selectEl('.new-product-box__card');
const newProductFormTheme = () => {
  if (localStorage.getItem('theme-mood') === 'dark') {
    new_product_form.classList.remove('light');
    new_product_form.classList.add('dark');
  } else {
    new_product_form.classList.remove('dark');
    new_product_form.classList.add('light');
  }
}
newProductFormTheme();
const newProductLanguage = () => {
  const cardTitle = selectEl('.new-product-box__card__title');
  const nameAr = selectEl('.name_ar');
  const nameEn = selectEl('.name_en');
  const nameFr = selectEl('.name_fr');
  const descAr = selectEl('.description_ar');
  const descEn = selectEl('.description_en');
  const descFr = selectEl('.description_fr');
  const price = selectEl('.price');
  const oldPrice = selectEl('.old_price');
  const image = selectEl('.image');
  const imageText = selectEl('.image-text');
  const quantity = selectEl('.quantity');
  const colors = selectEl('.colors');
  const sizes = selectEl('.sizes');
  const category = selectEl('.category');
  const addBtn = selectEl('.add-btn');
  const cache_en_delevery = selectEl('.cache_en_delevery');
  if (localStorage.getItem('language') === 'ar') {
    cardTitle.textContent = 'إضافة منتج جديد';
    nameAr.textContent = 'الإسم بالعربية:';
    nameEn.textContent = 'الإسم بالإنجليزية:';
    nameFr.textContent = 'الإسم بالفرنسية:';
    descAr.textContent = 'الوصف بالعربية:';
    descEn.textContent = 'الوصف بالإنجليزية:';
    descFr.textContent = 'الوصف بالفرنسية:';
    price.textContent = 'السعر:';
    oldPrice.textContent = 'السعر القديم:';
    image.textContent = 'صورة:';
    imageText.textContent = 'تحميل صورة';
    quantity.textContent = 'الكمية:';
    cache_en_delevery.textContent = 'الدفع عند الاستلام:';
    colors.textContent = 'الألوان:';
    sizes.textContent = 'الأحجام:';
    category.textContent = 'الفئة:';
    addBtn.textContent = 'إضافة المنتج:';
  } else if (localStorage.getItem('language') === 'fr') {
    cardTitle.textContent = 'NOUVEAU PRODUIT';
    nameAr.textContent = 'Nom arabe:';
    nameEn.textContent = 'Nom anglais:';
    nameFr.textContent = 'Nom français:';
    descAr.textContent = 'Descriptif arabe:';
    descEn.textContent = 'Descriptif anglais:';
    descFr.textContent = 'Descriptif français:';
    price.textContent = 'Le prix:';
    oldPrice.textContent = 'Ancien prix:';
    image.textContent = 'Image:';
    imageText.textContent = 'Telecharger une image';
    quantity.textContent = 'Quantité:';
    cache_en_delevery.textContent = 'paiement à la livraison:';
    colors.textContent = 'Couleurs:';
    sizes.textContent = 'Tailles:';
    category.textContent = 'Catégorie:';
    addBtn.textContent = 'AJOUTER LE PRODUIT';
  } else {
    cardTitle.textContent = 'ADD NEW PRODUCT';
    nameAr.textContent = 'Arabic name:';
    nameEn.textContent = 'English name:';
    nameFr.textContent = 'French name:';
    descAr.textContent = 'Arabic description:';
    descEn.textContent = 'English description:';
    descFr.textContent = 'French description:';
    price.textContent = 'Price:';
    oldPrice.textContent = 'Old price:';
    image.textContent = 'Image:';
    imageText.textContent = 'Upload image';
    quantity.textContent = 'Quantity:';
    cache_en_delevery.textContent = 'cash on delivery:';
    colors.textContent = 'Colors:';
    sizes.textContent = 'Sizes:';
    category.textContent = 'Category:';
    addBtn.textContent = 'ADD PRODUCT';
  }
}
newProductLanguage();
// product images start
const image = selectEl('#imageGlobal');
const imgGlobal = selectEl('.image-global');
const img = selectEl('.selected-image');
const gImg = selectEl('.g-image');
if (image.files[0]) {
  img.src = URL.createObjectURL(image.files[0])
  imgGlobal.src = URL.createObjectURL(image.files[0])
  gImg.src = URL.createObjectURL(image.files[0])
}
image.onchange = (event) => {
  img.src = URL.createObjectURL(event.target.files[0]);
  imgGlobal.src = URL.createObjectURL(event.target.files[0]);
  img.alt = 'image not found!';
  gImg.src = URL.createObjectURL(event.target.files[0]);
}
const sizeImgText = selectEl('.image_size_text');
const sizeImage = selectEl('#id_size_guide_image');
const sizeGideImg = selectEl('.size-guide-img');
if (sizeImage.files[0]) {
  sizeGideImg.src = URL.createObjectURL(sizeImage.files[0]);
}
sizeImage.onchange = (event) => {
  sizeGideImg.src = URL.createObjectURL(event.target.files[0]);
}

// product images end

// product name start
const name_ar = selectEl('#id_name_ar');
const name_en = selectEl('#id_name_en');
const name_fr = selectEl('#id_name_fr');
const productNameDiv = selectEl('.product-name');
const productNameAr = newEl('h1');
const productNameEn = newEl('h1');
const productNameFr = newEl('h1');
let arName;
let frName;
let enName;
name_ar.value ? productNameAr.innerHTML = name_ar.value : '';
name_fr.value ? productNameFr.innerHTML = name_fr.value : '';
name_en.value ? productNameEn.innerHTML = name_en.value : '';
name_ar.onkeyup = (e)=> {
  productNameAr.innerHTML = e.target.value;
}
name_fr.onkeyup = (e)=> {
  productNameFr.innerHTML = e.target.value;
}
name_en.onkeyup = (e)=> {
  productNameEn.innerHTML = e.target.value;
}
// product name end

// product description start
const descriptionTitle = selectEl('.description__title');
const productDescDiv = selectEl('.description__paragraph');
const description_ar = selectEl('#id_description_ar');
const description_en = selectEl('#id_description_en');
const description_fr = selectEl('#id_description_fr');
const productDescAr = newEl('p');
const productDescEn = newEl('p');
const productDescFr = newEl('p');
description_ar.value ? productDescAr.innerHTML = description_ar.value : '';
description_fr.value ? productDescFr.innerHTML = description_fr.value : '';
description_en.value ? productDescEn.innerHTML = description_en.value : '';
description_ar.onkeyup = (e) => {
  productDescAr.innerHTML = e.target.value;
}
description_en.onkeyup = (e) => {
  productDescEn.innerHTML = e.target.value;
}
description_fr.onkeyup = (e) => {
  productDescFr.innerHTML = e.target.value;
}
// product description end

// prices start
const price = selectEl('#id_price');
const oldPrice = selectEl('#id_old_price')
const productPrice = selectEl('.details-prices__price');
const productOldPrice = selectEl('.details-prices__old-price');
price.value ? productPrice.innerHTML = `${price.value} Dhs`: '';
oldPrice.value ? productOldPrice.innerHTML = `${oldPrice.value} Dhs`: '';
price.onkeyup = (e) => {
  productPrice.innerHTML = `${e.target.value} Dhs`;
}
oldPrice.onkeyup = (e) => {
  productOldPrice.innerHTML = `${e.target.value} Dhs`;
}
// prices end

// options title
const optionsTitle = selectEl('.product-options__title');
const colors_form = selectEl('#id_colors');
const selectColor = selectEl('#selectColor');
const colorsFunc = () => {
  const colorsDiv = selectEl('.product-options__colors');
  let colors = colors_form.value.split(',');
  colorsDiv.textContent = '';
  colors_form.value != '' ? colors.map((el)=> {
    const color = newEl('span');
    color.classList = 'product-options__colors__color';
    color.style.backgroundColor = el;
    if (localStorage.getItem('language') === 'ar') {
      color.style.float = 'right';
    } else {
      color.style.float = 'left';
    }
    setChild(colorsDiv,color);
  }) : '';
}
colorsFunc();
let colors = colors_form.value.split(',');
colors[0] === "" ? colors.shift() : '';
selectColor.onchange = (e) => {
  colors.push(e.target.value)
  colors_form.value = colors;
  colorsFunc();
}
colors_form.onchange = (e) => {
  colors = e.target.value.split(',');
  colors[0] === "" ? colors.shift() : '';
  colorsFunc();
}
const sizes_form = selectEl('#id_sizes');
const sizesFunc = () => {
  const sizesDiv = selectEl('.product-options__sizes');
  let sizes = sizes_form.value.split(',');
  sizes[0] === "" ? sizes.shift() : '';
  sizesDiv.textContent = '';
  sizes.map((el)=> {
    const size = newEl('span');
    if (localStorage.getItem('theme-mood') === 'light') {
      size.classList = 'product-options__sizes__size light';
    } else {
      size.classList = 'product-options__sizes__size dark';
    }
    if (localStorage.getItem('language') === 'ar') {
      size.style.float = 'right';
    } else {
      size.style.float = 'left';
    }
    size.innerHTML = el;
    setChild(sizesDiv,size);
  })
}
sizesFunc();
sizes_form.onchange = (e) => {
  sizes_form.value = e.target.value
  sizesFunc()
}
const newProductResult = () => { // new product translation function
  if (localStorage.getItem('language') === 'ar') {
    productNameDiv.textContent = '';
    productDescDiv.textContent = '';
    optionsTitle.textContent = 'الإختيارات:';
    setChild(productNameDiv,productNameAr);
    descriptionTitle.textContent = 'الوصف:';
    setChild(productDescDiv,productDescAr);
    sizeImgText.textContent = 'دليل الأحجام:';
  } else if (localStorage.getItem('language') === 'fr') {
    productNameDiv.textContent = '';
    productDescDiv.textContent = '';
    optionsTitle.textContent = 'Options:';
    setChild(productNameDiv,productNameFr);
    descriptionTitle.textContent = 'La Description:';
    setChild(productDescDiv,productDescFr);
    sizeImgText.textContent = 'Guide des tailles:';
  } else {
    productNameDiv.textContent = '';
    productDescDiv.textContent = '';
    optionsTitle.textContent = 'Options:';
    setChild(productNameDiv,productNameEn);
    descriptionTitle.textContent = 'Description:';
    setChild(productDescDiv,productDescEn);
    sizeImgText.textContent = 'Sizes guide:';
  }
}
newProductResult()

hideForm.addEventListener('click',()=> {
  newProductBox.style.display = 'none';
  showForm.style.display = 'block';
  newProductDetails.classList = 'col-12 my-2 new-product-details'; 
})
showForm.addEventListener('click',()=> {
  showForm.style.display = 'none';
  newProductBox.style.display = 'block';
  newProductDetails.classList = 'col-md-9 my-2 new-product-details';
})