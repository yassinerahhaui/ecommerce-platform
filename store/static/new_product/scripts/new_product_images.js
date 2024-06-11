const DetailsId = window.location.href.toString().split('/').slice(-1).toString()
const urlDetails = `${siteName}/api/product/details/`;
const newProductBox = selectEl('.new-product-box');
const newProductDetails = selectEl('.new-product-details');
const hideForm = selectEl('.hide-form');
const showForm = selectEl('.show-form');
ar.onclick = () => { // change lang to arabic
  localStorage.setItem('language','ar');
  productDetails(urlDetails,DetailsId);
  imageFormTranslate();
  category_list();
  language();
}
en.onclick = () => { // change lang to english
  localStorage.setItem('language','en');
  productDetails(urlDetails,DetailsId);
  imageFormTranslate();
  category_list();
  language();
}
fr.onclick = () => { // change lang to frensh
  localStorage.setItem('language','fr');
  productDetails(urlDetails,DetailsId);
  imageFormTranslate();
  category_list();
  language();
}

themeSwitchBtn.onclick = () => {
  if (localStorage.getItem('theme-mood') === 'dark') {
    localStorage.setItem('theme-mood','light');
    productDetails(urlDetails,DetailsId);
    category_list();
    theme()
  } else {
    localStorage.setItem('theme-mood','dark');
    productDetails(urlDetails,DetailsId);
    category_list();
    theme()
  }
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
const productDetails = async (url,id) => {
  const response = await fetch(`${url}${id}`,{
    method:'GET',
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
  });
  const data = await response.json();
  await product(data.results[0]);
}
productDetails(urlDetails,DetailsId);

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
const product = async (data) => {
  const pr = await data
  const name = selectEl('.product-name');
  const price = selectEl('.details-prices__price');
  price.textContent = `${pr.price} Dhs`;
  const oldPrice = selectEl('.details-prices__old-price');
  oldPrice.textContent = `${pr.old_price} Dhs`;
  const optionsTitle = selectEl('.product-options__title');
  const descriptionTitle = selectEl('.description__title');
  const descParagraph = selectEl('.description__paragraph');
  const sizesDiv = selectEl('.product-options__sizes');
  sizesDiv.textContent = '';
  pr.sizes.map((el) => {
    const size = document.createElement('span');
    if (localStorage.getItem('theme-mood') === 'light') {
      size.classList = 'product-options__sizes__size light';
    } else {
      size.classList = 'product-options__sizes__size dark';
    }
    size.innerHTML = el;
    setChild(sizesDiv,size);
    if (localStorage.getItem('language') === 'ar') {
      size.style.float = 'right';
    } else {
      size.style.float = 'left';
    }
  })
  const colorsDiv = selectEl('.product-options__colors');
  colorsDiv.textContent = '';
  pr.colors.map((el)=> {
    const color = document.createElement('span');
    color.classList = 'product-options__colors__color';
    color.style.backgroundColor = el;
    setChild(colorsDiv,color);
    if (localStorage.getItem('language') === 'ar') {
      color.style.float = 'right';
    } else {
      color.style.float = 'left';
    }
  })
  if (localStorage.getItem('language') == 'ar') {
    name.innerHTML = await `<h1>${pr.name_ar}</h1>`;
    optionsTitle.textContent = 'الإختيارات:';
    pr.description_ar ?  descriptionTitle.textContent = 'الوصف:' : '';
    pr.description_ar ? descParagraph.innerHTML = pr.description_ar : '';
  } else if (localStorage.getItem('language') == 'fr') {
    name.innerHTML = await `<h1>${pr.name_fr}</h1>`;
    optionsTitle.textContent = 'Options:';
    pr.description_fr ? descriptionTitle.textContent = 'La Description:' : '';
    pr.description_fr ? descParagraph.innerHTML = pr.description_fr : '';
  } else {
    name.innerHTML = await `<h1>${pr.name_en}</h1>`;
    optionsTitle.textContent = 'Options:';
    pr.description_en ? descriptionTitle.textContent = 'Description:' : '';
    pr.description_en ? descParagraph.innerHTML = pr.description_en : '';
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
  const imagesFormTitle = selectEl('.new-product-box__card__title');
  let count = 0
  if (localStorage.getItem('language') === 'ar') {
    imagesFormTitle.textContent = 'إضافة الصور';
  } else if (localStorage.getItem('language') === 'fr') {
    imagesFormTitle.textContent = 'AJOUTER DES IMAGES';
  } else {
    imagesFormTitle.textContent = 'ADD IMAGES';
  }
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
imageFormTranslate()