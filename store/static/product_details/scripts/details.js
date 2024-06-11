const DetailsId = window.location.href.toString().split('/').slice(-1).toString();
const urlDetails = `${siteName}/api/product/details/`;
const urlReviewsInfo = `${siteName}/api/product/details/reviews/`;
const sliderUrl = `${siteName}/api/product/slider/list`;
const languageD = localStorage.getItem('language');
const reviewStatus = document.querySelector('.reviews__details__status');
const reviewsResultDiv = document.querySelector('.reviews__details__result');
const reviewsInfoUrl = `${siteName}/product/details/reviews/info/`;
const addToCartBTN = Array.from(document.querySelectorAll('button.add-to-cart-btn'));

const productDetails = async (url,id) => {
  const response = await fetch(`${url}${id}`,{
    method:'GET',
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrftoken,
    },
  });
  const data = await response.json();
  await product(data.results[0]);
}
productDetails(urlDetails,DetailsId);

const add_chat_room = async (id) => {
  const response = await fetch(`/chat/product/${id}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
    },
    cors: 'same-origin'
  });
  const data = await response.json();
}

const chatRoomBtn = selectEl('.contact-seler');
chatRoomBtn.onclick = () => add_chat_room(DetailsId);

ar.onclick = () => { // change lang to arabic
  localStorage.setItem('language','ar');
  productDetails(urlDetails,DetailsId);
  cache_en_delevery_language();
  category_list();
  reviewsResult(reviewStatus,reviewsResultDiv,reviewsInfoUrl,DetailsId);
  language();
}
en.onclick = () => { // change lang to english
  localStorage.setItem('language','en');
  productDetails(urlDetails,DetailsId);
  cache_en_delevery_language();
  category_list();
  reviewsResult(reviewStatus,reviewsResultDiv,reviewsInfoUrl,DetailsId);
  language();
}
fr.onclick = () => { // change lang to frensh
  localStorage.setItem('language','fr');
  productDetails(urlDetails,DetailsId);
  cache_en_delevery_language();
  category_list();
  reviewsResult(reviewStatus,reviewsResultDiv,reviewsInfoUrl,DetailsId);
  language();
}

themeSwitchBtn.onclick = () => {
  if (localStorage.getItem('theme-mood') === 'dark') {
    localStorage.setItem('theme-mood','light');
    productDetails(urlDetails,DetailsId);
    category_list();
    reviewsResult(reviewStatus,reviewsResultDiv,reviewsInfoUrl,DetailsId);
    theme();
  } else {
    localStorage.setItem('theme-mood','dark');
  }
  productDetails(urlDetails,DetailsId);
  cache_en_delevery_theme();
  category_list();
  reviewsResult(reviewStatus,reviewsResultDiv,reviewsInfoUrl,DetailsId);
  theme();
  chatRoomsTheme();
}

const images = Array.from(document.querySelectorAll('.image-list img'));
const selectedImage = document.querySelector('.selected-image');
if (images.length == 1) {
  window.addEventListener('resize',()=> {
    if (window.innerWidth < 575.98) {
      images.map(el=> el.style.display = 'none')
    } else {
      images.map(el=> el.style.display = 'block')
    }
  })
}

images.map((img)=> {
  img.onmouseover = () => selectedImage.src = img.src;
  img.onclick = () => selectedImage.src = img.src;
})

let shopProduct = {id:0,name_ar:'',name_en:'',name_fr:'',image:'',quantity:0,color:'',size:'',price:''};

const product = async (product) => {
  shopProduct.id = product.id;
  shopProduct.image = `${siteName}/media/${product.image}`;
  shopProduct.price = product.price;
  shopProduct.name_ar = product.name_ar;
  shopProduct.name_en = product.name_en;
  shopProduct.name_fr = product.name_fr;
  const reviewStars = document.querySelector('.review-stars');
  const reviewsResult = document.createElement('span');
  const allUserRatting = document.createElement('span');
  reviewStars.textContent = '';
  const prices_type = Array.from(selectAll('.details-prices .price-type'));
  prices_type.map(p=> {
    if (localStorage.getItem('language') === 'ar') {
      p.textContent = ' د.م';
    } else {
      p.textContent = ' Dhs';
    }
  })
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('i');
    if (i <= product.reviews) {
      star.classList = 'fa-solid fa-star';
    }else {
      const half = product.reviews - i
      half > -1 ? star.classList = 'fa-regular fa-star-half-stroke' : star.classList = 'fa-regular fa-star';
    }
    star.classList.add('star');
    reviewStars.appendChild(star);
  }
  reviewsResult.textContent = product.reviews.toPrecision(2);
  allUserRatting.textContent = `(${parseInt(product.allUserRate)})`;
  allUserRatting.classList = 'all-user-ratting';
  reviewsResult.classList = 'reviews-result';
  reviewStars.appendChild(reviewsResult);
  reviewStars.appendChild(allUserRatting);
  
  const optionsTitle = document.querySelector('.product-options__title');

  // Quantity start 
  const quantity = document.querySelector('.product-options__quantity');
  const quantityTitle = document.querySelector('.product-options__quantity__title');
  let quantityValue = parseInt(document.querySelector('.product-options__quantity__value').value);
  const quantityless = document.querySelector('.product-options__quantity__less');
  const quantityMore = document.querySelector('.product-options__quantity__more');
  shopProduct.quantity = quantityValue
  if (product.quantity === 0) {
    document.querySelector('.product-options__quantity__value').value = 0;
    document.querySelector('.product-options__quantity__value').disabled = true;
  }else {
    document.querySelector('.product-options__quantity__value').disabled = false;
  }
  document.querySelector('.product-options__quantity__value').title = `${product.quantity}`;
  quantityless.addEventListener('click', () => {
    if (quantityValue >= 1) {
       quantityValue -=1;
       document.querySelector('.product-options__quantity__value').value = quantityValue;
       shopProduct.quantity = quantityValue
    }
  })
  quantityMore.addEventListener('click', () => {
    if (quantityValue < product.quantity) {
      quantityValue += 1;
      document.querySelector('.product-options__quantity__value').value = quantityValue;
      shopProduct.quantity = quantityValue
    } 
  })
  // Quantity end

  // Sale start 
  let sale;
  if (document.querySelector('.details-prices__sale')) {
    sale = document.querySelector('.details-prices__sale');
  } else {
    sale = ''
  }
  // Sale end

  const detailsWishList = document.querySelector('.details-wish-list')
  detailsWishList.addEventListener('click',async () => {
    const res = await fetch(`${siteName}/add-to-favorite/${DetailsId}`,{
      method: 'PUT',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify({payload: DetailsId})
    });
    let data = await res.json();
    let favorite = data.favorite;
    if (favorite === false) {
      detailsWishList.style.color = '#fff';
    } else {
      detailsWishList.style.color = '#D50000';
    }
  })
  const in_favorite = async () => {
    const res = await fetch(`${siteName}/in-favorite/${DetailsId}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      }
    });
    const data = await res.json();
    let favorite = await data.favorite;
    if (favorite === false) {
      detailsWishList.style.color = '#fff';
    } else {
      detailsWishList.style.color = '#D50000';
    }
  }
  in_favorite();
  const sizes = document.querySelector('.product-options__sizes');
  if (product.sizes) {
    sizes.textContent = ''
    product.sizes.map((el)=> {
      const size = document.createElement('span');
      size.classList = 'product-options__sizes__size';
      size.innerHTML = el;
      sizes.appendChild(size)
      if (localStorage.getItem('theme-mood') === 'light') {
        size.classList.remove('dark');
        size.classList.add('light');
      } else {
        size.classList.remove('light');
        size.classList.add('dark');
      }
      if (localStorage.getItem('language') === 'ar') {
        size.style.float = 'right';
      } else {
        size.style.float = 'left';
      }
      size.onclick =()=> {
        const sizesx = Array.from(document.querySelectorAll('.product-options__sizes__size'))
        sizesx.map((el)=> el.classList.remove('selectedSize'));
        size.classList.add('selectedSize');
        shopProduct.size = el
      } 
    })
  }

  const colors = document.querySelector('.product-options__colors');
  if (product.colors) {
    colors.textContent = '';
    product.colors.map((el)=> {
      const color = document.createElement('span');
      color.classList = 'product-options__colors__color';
      color.style.backgroundColor = el;
      colors.appendChild(color)
      if (localStorage.getItem('theme-mood') === 'light') {
        color.classList.remove('dark');
        color.classList.add('light');
      } else {
        color.classList.remove('light');
        color.classList.add('dark');
      }
      if (localStorage.getItem('language') === 'ar') {
        color.style.float = 'right';
      } else {
        color.style.float = 'left';
      }
      color.onclick = () => {
        const colorx = Array.from(document.querySelectorAll('.product-options__colors__color'))
        colorx.map((el)=> el.classList.remove('selectedColor'));
        color.classList.add('selectedColor');
        shopProduct.color = el;
      }
      
    })
  }
  
  // description start
  const descriptionTitle = document.querySelector('.description__title');
  const descriptionParagraph = document.querySelector('.description__paragraph');
  

  if (localStorage.getItem('language') === 'ar') {
    document.getElementById('title').textContent = product.name_ar;
    reviewStars.style.direction = 'ltr';
    reviewStars.style.textAlign = 'right';
    product.sale ? sale.textContent = `تخفيض ${product.salePer}%`: '';
    detailsWishList.title = 'أضيف المنتوج إلى قائمة الإهتمامات';
    optionsTitle ? optionsTitle.textContent = 'الإختيارات:' : '';
    quantity.style.direction = 'ltr';
    quantity.style.justifyContent = 'right';
    quantityTitle.textContent = 'الكمية:';
    addToCartBTN.map((el)=> el.textContent = 'أضف إلى السلة')
    product.description_ar ? descriptionTitle.textContent = 'الوصف:': '';
    product.description_ar ? descriptionParagraph.innerHTML = product.description_ar : '';
  } else if (localStorage.getItem('language') === 'en') {
    document.getElementById('title').textContent = product.name_en;
    reviewStars.style.textAlign = 'left';
    quantity.style.justifyContent = 'left';
    product.sale ? sale.textContent = `SALE ${product.salePer}%`: '';
    detailsWishList.title = 'add product to wishlist';
    optionsTitle ? optionsTitle.textContent = 'Options:' : '';
    quantityTitle.textContent = 'Quantity:';
    addToCartBTN.map((el)=> el.textContent = 'ADD TO CART')
    product.description_en ? descriptionTitle.textContent = 'Description:': '';
    product.description_en ? descriptionParagraph.innerHTML = product.description_en : '';
  }else if (localStorage.getItem('language') === 'fr') {
    document.getElementById('title').textContent = product.name_fr;
    reviewStars.style.textAlign = 'left';
    quantity.style.justifyContent = 'left';
    product.sale ? sale.textContent = `SOLDE ${product.salePer}%`: '';
    detailsWishList.title = 'ajouter le produit à la liste de souhaits';
    optionsTitle ? optionsTitle.textContent = 'Options:' : '';
    quantityTitle.textContent = 'Quantité:';
    addToCartBTN.map((el)=> el.textContent = 'AJOUTER AU PANIER')
    product.description_fr ? descriptionTitle.textContent = 'La Description:': '';
    product.description_fr ? descriptionParagraph.innerHTML = product.description_fr : '';
  }
  else {
    localStorage.setItem('language','en');
  }
}

let item = [];
let box = document.querySelector('.add-to-cart-success');
const boxAlert = document.querySelector('.add-to-cart-success .success-cart');

addToCartBTN.map((el)=> {
  el.addEventListener('click',() => { // warning (add to cart not completed)
    if (localStorage.getItem('shopping-cart')) {
      item = JSON.parse(localStorage.getItem('shopping-cart'));
      item.push(shopProduct)
      localStorage.setItem('shopping-cart',JSON.stringify(item));
    }  else {
      item.push(shopProduct)
      localStorage.setItem('shopping-cart',JSON.stringify(item));
    }
    
    box.style.display = 'block';
    if (localStorage.getItem('language') === 'ar') {
      boxAlert.textContent = 'لقد تمت إضافة المنتج إلى سلة المشتريات بنجاح.';
    } else if (localStorage.getItem('language') === 'fr') {
      boxAlert.textContent = 'Le produit a été ajouté au panier avec succès.';
    } else {
      boxAlert.textContent = 'The product has been successfully added to the cart.';
    }
    
    setTimeout(() => shopNum.textContent = JSON.parse(localStorage.getItem('shopping-cart')).length,1000)
  })
})
box.onclick = () => box.style.display = 'none';

reviewsResult(reviewStatus,reviewsResultDiv,reviewsInfoUrl,DetailsId);

