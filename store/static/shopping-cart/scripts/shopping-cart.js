const shopCartTitle = document.querySelector('.shopping-cart-title');
const shopping_cart_items = JSON.parse(localStorage.getItem('shopping-cart'));
const shopping_card_body = document.querySelector('.shopping-card-body');
const cardShoppingCart = document.querySelector('.card-shopping-cart');


ar.onclick = () => { // change lang to arabic
  localStorage.setItem('language','ar');
  shoppingCart();
  category_list();
  language();
}
en.onclick = () => { // change lang to english
  localStorage.setItem('language','en');
  shoppingCart();
  category_list();
  language();
}
fr.onclick = () => { // change lang to frensh
  localStorage.setItem('language','fr');
  shoppingCart();
  category_list();
  language();
}
themeSwitchBtn.onclick = () => {
  if (localStorage.getItem('theme-mood') === 'dark') {
    localStorage.setItem('theme-mood','light');
  } else {
    localStorage.setItem('theme-mood','dark');
  }
  shoppingCart();
  category_list();
  theme();
}
const btnClose = (id) => {
  shopping_cart_items.splice(id,1);
  localStorage.setItem('shopping-cart',JSON.stringify(shopping_cart_items));
  window.location.reload();
}

var totalPrice = 0;
const shoppingCart = () => {
  const cardFooterTotalPrice = document.querySelector('.card-footer__total-price');
  shopping_card_body.textContent = '';
  if (localStorage.getItem('shopping-cart')) {
    shopping_cart_items.length === 0 ? localStorage.removeItem('shopping-cart') : shopping_cart_items.map((el)=> {
      const card = document.createElement('div');
      const image = document.createElement('img');
      const name = document.createElement('p');
      const price = document.createElement('p');
      const quantity = document.createElement('p');
      const box1 = document.createElement('div');
      const color = document.createElement('span');
      const size = document.createElement('span');
      const closeBTN = document.createElement('span');
      const closeIcon = document.createElement('i');
      closeBTN.onclick = () => btnClose(shopping_cart_items.indexOf(el));
      totalPrice += parseFloat(el.price) * el.quantity;
      card.classList = 'card-item';
      image.classList = 'card-item__image';
      name.classList = 'card-item__name';
      price.classList = 'card-item__price';
      quantity.classList = 'card-item__quantity';
      color.classList = 'card-item__box1__color';
      size.classList = 'card-item__box1__size';
      box1.classList = 'card-item__box1';
      closeBTN.classList = 'delete';
      closeIcon.classList = 'fa-solid fa-trash-can';
      closeBTN.appendChild(closeIcon);
      card.appendChild(closeBTN);
      closeBTN.title = 'delete from cart';
      image.src = el.image;
      
      if (localStorage.getItem('language') === 'ar') {
        name.innerHTML = el.name_ar;
        price.innerHTML = `<b>الثمن: </b><span>${el.price} د.م</span>`;
        quantity.innerHTML = `<b>الكمية: </b><span>${el.quantity}</span>`;
        card.style.textAlign = 'right';
      } else if (localStorage.getItem('language') === 'fr') {
        name.innerHTML = el.name_fr;
        price.innerHTML = `<b>Le Prix: </b><span>${el.price} Dhs</span>`;
        quantity.innerHTML = `<b>Quantité </b><span>${el.quantity}</span>`;
        card.style.textAlign = 'left';
      } else {
        name.innerHTML = el.name_en;
        price.innerHTML = `<b>Price: </b><span>${el.price} Dhs</span>`;
        quantity.innerHTML = `<b>Quantity: </b><span>${el.quantity}</span>`;
        card.style.textAlign = 'left';
      }
      name.onclick = () => window.location.href = `${siteName}/product/details/${el.id}`;
      color.style.width = '40px';
      color.style.height = '20px';
      color.style.display = 'inline-block';
      color.style.backgroundColor = el.color;
      color.style.borderRadius = '6px'

      el.color  ? color.style.boxShadow = `0 0 2px ${el.color}`: '';
      el.color  ? color.style.border = `1px solid black`: '';
      size.innerHTML = el.size;
      card.style.display = 'inline-block';
      card.appendChild(image);
      card.appendChild(name);
      card.appendChild(quantity);
      card.appendChild(price);
      el.color  ? box1.appendChild(color): box1.appendChild(color);
      el.size ? box1.appendChild(size): '';
      card.appendChild(box1);
      
      shopping_card_body.appendChild(card);
      
    })
  }
  
  if (localStorage.getItem('language') === 'ar') {
    shopCartTitle.textContent = 'سلة المشتريات';
    totalPrice !== 0 ? cardFooterTotalPrice.textContent = `الثمن كامل: ${totalPrice} د.م`:'';
    !localStorage.getItem('shopping-cart') ? shopping_card_body.innerHTML = '<h2 class="fs-2 mt-5">سلة التسوق الخاصة بك فارغة!</h2>' : '';
  } else if (localStorage.getItem('language') === 'fr') {
    shopCartTitle.textContent = 'PANIER';
    totalPrice !== 0 ? cardFooterTotalPrice.textContent = `Prix Total: ${totalPrice} Dhs`:'';
    !localStorage.getItem('shopping-cart') ? shopping_card_body.innerHTML = '<h2 class="fs-2 mt-5">votre panier est vide !</h2>' : '';

  } else {
    shopCartTitle.textContent = 'SHOPPING CART';
    totalPrice !== 0 ? cardFooterTotalPrice.textContent = `Total Price: ${totalPrice} Dhs`:'';
    !localStorage.getItem('shopping-cart') ? shopping_card_body.innerHTML = '<h2 class="fs-2 mt-5">your shopping cart is empty!</h2>' : '';
  }
  if (localStorage.getItem('theme-mood') === 'light' ) {
    cardShoppingCart.classList = 'card-body rounded shopping-card-body light';
    cardFooterTotalPrice.classList = 'card-footer__total-price light';
  } else {
    cardShoppingCart.classList = 'card-body rounded shopping-card-body dark';
    cardFooterTotalPrice.classList = 'card-footer__total-price dark';
  }
}
shoppingCart();
