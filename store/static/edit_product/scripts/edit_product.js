const newProductBox = selectEl('.new-product-box');
const newProductDetails = selectEl('.new-product-details')
const hideForm = selectEl('.hide-form');
const showForm = selectEl('.show-form');
hideForm.title = 'hide form.';
showForm.title = 'show form.';

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



ar.onclick = () => { // change lang to arabic
  localStorage.setItem('language','ar');
  sizesFunc();
  colorsFunc();
  edit_product();
  imageFormTranslate();
  category_list();
  language();
}
en.onclick = () => { // change lang to english
  localStorage.setItem('language','en');
  sizesFunc();
  colorsFunc();
  edit_product();
  imageFormTranslate();
  category_list();
  language();
}
fr.onclick = () => { // change lang to frensh
  localStorage.setItem('language','fr');
  sizesFunc();
  colorsFunc();
  edit_product();
  imageFormTranslate();
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
  theme();
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
const sizesFunc = () => {
  const sizes_form = selectEl('#id_sizes');
  const sizesDiv = selectEl('.product-options__sizes');
  const sizes = sizes_form.value.split(',');
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
const colorsFunc = () => {
  const colors_form = selectEl('#id_colors');
  const colorsDiv = selectEl('.product-options__colors');
  const colors = colors_form.value.split(',');
  colorsDiv.textContent = '';
  colors.map((el)=> {
    const color = newEl('span');
    color.classList = 'product-options__colors__color';
    color.style.backgroundColor = el;
    if (localStorage.getItem('language') === 'ar') {
      color.style.float = 'right';
    } else {
      color.style.float = 'left';
    }
    setChild(colorsDiv,color);
  })
}


const edit_product = () => {
  const name = selectEl('.product-name');
  // if language is arabic
  const ar_name_form = selectEl('#id_name_ar');
  const nameAr = newEl('h1');
  nameAr.innerHTML = ar_name_form.value
  ar_name_form.onkeyup = (e) => nameAr.innerHTML = e.target.value;
  // if language is français
  const fr_name_form = selectEl('#id_name_fr');
  const nameFr = newEl('h1');
  nameFr.innerHTML = fr_name_form.value
  fr_name_form.onkeyup = (e) => nameFr.innerHTML = e.target.value;
  // if language is english
  const en_name_form = selectEl('#id_name_en');
  const nameEn = newEl('h1');
  nameEn.innerHTML = en_name_form.value
  en_name_form.onkeyup = (e) => nameEn.innerHTML = e.target.value;
  // names label
  const name_ar_label = selectEl('div.Name.ar label');
  const name_fr_label = selectEl('div.Name.fr label');
  const name_en_label = selectEl('div.Name.en label');
  // description
  const description_title = selectEl('.description__title');
  const description = selectEl('div.description');
  // description in arabic
  const ar_description_form = selectEl('#id_description_ar');
  const descriptionAr = newEl('p');
  descriptionAr.classList = 'description__paragraph';
  descriptionAr.innerHTML = ar_description_form.value;
  ar_description_form.onkeyup = (e) => descriptionAr.innerHTML = e.target.value;
  // description in français
  const fr_description_form = selectEl('#id_description_fr');
  const descriptionFr = newEl('p');
  descriptionFr.classList = 'description__paragraph';
  descriptionFr.innerHTML = fr_description_form.value;
  fr_description_form.onkeyup = (e) => descriptionFr.innerHTML = e.target.value;
  // description in english
  const en_description_form = selectEl('#id_description_en');
  const descriptionEn = newEl('p');
  descriptionEn.classList = 'description__paragraph';
  descriptionEn.innerHTML = en_description_form.value;
  en_description_form.onkeyup = (e) => descriptionEn.innerHTML = e.target.value;
  // description label
  const ar_description_label = selectEl('div.Description.ar label');
  const fr_description_label = selectEl('div.Description.fr label');
  const en_description_label = selectEl('div.Description.en label');
  // prices
  const price_form = selectEl('#id_price');
  const price = selectEl('.details-prices__price');
  price.innerHTML = `${price_form.value} Dhs`;
  price_form.onkeyup = (e) => price.innerHTML = `${e.target.value} Dhs`; 
  const old_price_form = selectEl('#id_old_price');
  const old_price = selectEl('.details-prices__old-price');
  old_price.innerHTML = `${old_price_form.value} Dhs`
  old_price_form.onkeyup = (e) => old_price.innerHTML = `${e.target.value} Dhs`;
  // price label
  const price_label = selectEl('div.Price label');
  const old_price_label = selectEl('div.Old.price label');
  // options
  const optionsTitle = selectEl('.product-options__title');
  // options label
  const quantity_label = selectEl('div.Quantity label');

  // sizes
  sizesFunc();
  // colors
  colorsFunc();
  // global image
  const global_image_form = selectEl('div.Image a');
  const change_global_image = selectEl('#id_image');
  const gimages = Array.from(selectAll('.g-image'));
  if (change_global_image.files[0]) {
    gimages.map(el=> el.src = URL.createObjectURL(change_global_image.files[0]));
  } else if (global_image_form) {
    gimages.map(el=> {
      el.src = global_image_form.href
    })
  }
  change_global_image.onchange = (e) => gimages.map(el=> el.src = URL.createObjectURL(e.target.files[0]));
  // global image label
  const global_image_label = selectEl('div.Image label');
  // Size guide image
  const size_guide_image_label = selectEl('div.Size.guide.image label');
  const size_quide_image_form = selectEl('#id_size_guide_image');
  const size_guide_image_link = selectEl('div.Size.guide.image a');
  const size_guide_image = selectEl('.size-guide-img')
  if (size_quide_image_form.files[0]) {
    size_guide_image.src = URL.createObjectURL(size_quide_image_form.files[0])
  } else if (size_guide_image_link) {
    size_guide_image.src = size_guide_image_link.href
  }
  size_quide_image_form.onchange = (e) => size_guide_image.src = URL.createObjectURL(e.target.files[0]);
  // edit colors
  const colors_label = selectEl('div.Colors label');
  const colors_selector = selectEl('.color-selector');
  const colors_form = selectEl('#id_colors');
  let colors = colors_form.value.split(',');
  colors_selector.addEventListener('change', (e) => {
    colors.push(e.target.value)
    colors_form.value = colors;
    colorsFunc();
  });
  // edit sizes
  const sizes_label = selectEl('div.Sizes label');
  const sizes_form = selectEl('#id_sizes');
  sizes_form.addEventListener('change',(e)=> {
    sizesFunc();
  })
  // change category
  const category_label = selectEl('div.Category.parent label');
  const editProductFormTitle = selectEl('.new-product-box__card__title');
  const cache_en_delevery = selectEl('.cache_en_delevery');
  if (localStorage.getItem('language') === 'ar') {
    editProductFormTitle.textContent = 'تعديل المنتج';
    // product name
    name.textContent = '';
    setChild(name,nameAr);
    name_ar_label.textContent = 'الإسم بالعربية:';
    name_fr_label.textContent = 'الإسم بالفرنسية:';
    name_en_label.textContent = 'الإسم بالإنجليزية:';
    // product description
    description_title.textContent = 'الوصف:';
    description.textContent = '';
    setChild(description,descriptionAr);
    ar_description_label.textContent = 'الوصف بالعربية:'; 
    fr_description_label.textContent = 'الوصف بالفرنسية:'; 
    en_description_label.textContent = 'الوصف بالإنجليزية:'; 
    // prices label
    price_label.textContent = 'السعر:';
    old_price_label.textContent = 'السعر السابق:';
    // options
    optionsTitle.textContent = 'الإختيارات:';
    // options label
    quantity_label.textContent = 'الكمية:';
    cache_en_delevery.textContent = 'الدفع عند الاستلام:';
    // global image label
    global_image_label.textContent = 'الصورة الرئيسية:';
    size_guide_image_label.textContent = 'صورة دليل الأحجام:';
    // colors
    colors_label.textContent = 'الألوان:';
    // sizes
    sizes_label.textContent = 'الأحجام:';
    category_label.textContent = 'الفئة:';
  } else if (localStorage.getItem('language') === 'fr') {
    editProductFormTitle.textContent = 'MODIFIER LE PRODUIT';
    // product name
    name.textContent = '';
    setChild(name,nameFr);
    name_ar_label.textContent = 'Nom en arabe:';
    name_fr_label.textContent = 'Nom en français:';
    name_en_label.textContent = 'Nom en anglais:';
    // product description
    description_title.textContent = 'La description:';
    description.textContent = '';
    setChild(description,descriptionFr);
    ar_description_label.textContent = 'Description en arabe:'; 
    fr_description_label.textContent = 'Description en français:'; 
    en_description_label.textContent = 'description en anglais:'; 
    // prices label
    price_label.textContent = 'Le prix:';
    old_price_label.textContent = 'Ancien prix:';
    // options
    optionsTitle.textContent = 'Options:';
    // options label
    quantity_label.textContent = 'Quantité:';
    cache_en_delevery.textContent = 'paiement à la livraison:';
    // global image label
    global_image_label.textContent = 'Image principale:';
    size_guide_image_label.textContent = 'Image du guide des tailles :';
    // colors
    colors_label.textContent = 'Couleurs:';
    // sizes
    sizes_label.textContent = 'Les tailles:';
    category_label.textContent = 'Catégorie:';
  } else {
    editProductFormTitle.textContent = 'EDIT PRODUCT';
    // product name
    name.textContent = '';
    setChild(name,nameEn);
    name_ar_label.textContent = 'Arabic name:';
    name_fr_label.textContent = 'French name:';
    name_en_label.textContent = 'English name:';
    // product description
    description_title.textContent = 'Description:';
    description.textContent = '';
    setChild(description,descriptionEn);
    ar_description_label.textContent = 'Arabic description:';
    fr_description_label.textContent = 'French description:';
    en_description_label.textContent = 'English description:';
    // prices label
    price_label.textContent = 'Price:';
    old_price_label.textContent = 'Old price:';
    // options
    optionsTitle.textContent = 'Options:';
    // options label
    quantity_label.textContent = 'Quantity:';
    cache_en_delevery.textContent = 'cash on delivery:';
    // global image label
    global_image_label.textContent = 'Main picture:';
    size_guide_image_label.textContent = 'Sizes guide image:';
    // colors
    colors_label.textContent = 'Colors:';
    // sizes
    sizes_label.textContent = 'Sizes:';
    category_label.textContent = 'Category:';
  }
}
const productImages = () => {
  // images link
  const image1FormLink = selectEl('.id_image1 a');
  const image2FormLink = selectEl('.id_image2 a');
  const image3FormLink = selectEl('.id_image3 a');
  const image4FormLink = selectEl('.id_image4 a');
  const image5FormLink = selectEl('.id_image5 a');

  // image src
  const image1 = Array.from(selectAll('.image1'));
  const image2 = Array.from(selectAll('.image2'));
  const image3 = Array.from(selectAll('.image3'));
  const image4 = Array.from(selectAll('.image4'));
  const image5 = selectEl('.image5')

  // image input
  const image1form = selectEl('#id_image1');
  const image2form = selectEl('#id_image2');
  const image3form = selectEl('#id_image3');
  const image4form = selectEl('#id_image4');
  const image5form = selectEl('#id_image5');

  if (image1FormLink) {
    image1.map((el)=> {
      return el.src = image1FormLink.href;
    })
  } 
  image1form.onchange = (e) => image1.map((el)=> el.src = URL.createObjectURL(e.target.files[0]));
  if (image2FormLink) {
    image2.map((el)=> {
      return el.src = image2FormLink.href;
    })
  }
  image2form.onchange = (e) => image2.map((el)=> el.src = URL.createObjectURL(e.target.files[0]));
  if (image3FormLink) {
    image3.map((el)=> {
      return el.src = image3FormLink.href;
    })
  }
  image3form.onchange = (e) => image3.map((el)=> el.src = URL.createObjectURL(e.target.files[0]));
  if (image4FormLink) {
    image4.map((el)=> {
      return el.src = image4FormLink.href;
    })
  }
  image4form.onchange = (e) => image4.map((el)=> el.src = URL.createObjectURL(e.target.files[0]));
  if (image5FormLink) {
    image5.src = image5FormLink.href;
  }
  image5form.onchange = (e) => image5.src = URL.createObjectURL(e.target.files[0]);
}
productImages();
const activeImage = () => {
  const imageList = Array.from(selectAll('.image-list img'));
  const imageActive = selectEl('.selected-image');
  imageList.map(el=> {
    el.addEventListener('mouseover',(e) => {
      imageActive.src = e.target.src;
    })
    el.addEventListener('click',(e) => {
      imageActive.src = e.target.src;
    })
  })
  
}
activeImage();
const imageFormTranslate = () => {
  const imagesName = Array.from(selectAll('.field'));
  let count = 0
  imagesName.map((field)=> {
    count += 1;
    const imgName = field.querySelector('.imgN');
    if (localStorage.getItem('language') == 'ar') {
      imgName.textContent = `الصورة${count}:`;
    } else {
      imgName.textContent = `Image${count}:`;
    }
  })
  
}
edit_product();
imageFormTranslate();


