const wallet = selectEl('.dashboard-list .wallet');
const sales = selectEl('.dashboard-list .sales');
const purchases = selectEl('.dashboard-list .purchases');
const dashboardContent = selectEl('.dashboard-content');


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
  dashboardTheme();
  walletContent();
  chatRoomsTheme();
}

ar.onclick = () => { // change lang to arabic
  localStorage.setItem('language','ar');
  dashboardLanguage();
  walletContent();
  category_list();
  language();
}
en.onclick = () => { // change lang to english
  localStorage.setItem('language','en');
  dashboardLanguage();
  walletContent();
  category_list();
  language();
}
fr.onclick = () => { // change lang to frensh
  localStorage.setItem('language','fr');
  dashboardLanguage();
  walletContent();
  category_list();
  language();
}


const fetch_user_wallet = async () => {
 const response = await fetch(`${siteName}/accounts/dashboard/wallet`,{
   method: 'GET',
   headers: {
     'Content-Type': 'application/json',
     'X-CSRFToken': csrftoken,
    }
  })
  const data = await response.json()
  return data
}

const walletContent = async () => {
  is_loading(dashboardContent);
  const money = newEl('div');
  const data = await fetch_user_wallet();
  dashboardContent.textContent = '';
  
  let num = data.wallet[0].money;
  if (localStorage.getItem('theme-mood') === 'dark') {
    money.classList = 'active-money dark';
  } else {
    money.classList = 'active-money light';
  }
  if (localStorage.getItem('language') === 'ar') {
    money.innerHTML = `أموالك: ${num}$`;
  } else if (localStorage.getItem('language') === 'fr') {
    money.innerHTML = `Ton Argent: ${num}$`;
  } else {
    money.innerHTML = `Your Money: ${num}$`;
  }
  
  setChild(dashboardContent,money);
  const transBox = newEl('div');
  if (localStorage.getItem('theme-mood') === 'dark') {
    setClass(transBox,'trans-box dark fw-bold table-title');
  } else {
    setClass(transBox,'trans-box light fw-bold table-title');
  }
  const sender = newEl('span');setClass(sender,'trans-box__sender');
  const seler = newEl('span');setClass(seler,'trans-box__seler');
  const price = newEl('span');setClass(price,'trans-box__price');
  const dateTime = newEl('span');setClass(dateTime,'trans-box__date-time');
  if (localStorage.getItem('language') === 'ar') {
    sender.innerHTML = 'الزبون';
    seler.innerHTML = 'البائع';
    price.innerHTML = `المبلغ`;
    dateTime.innerHTML = 'التاريخ';
  } else if (localStorage.getItem('language') === 'fr') {
    sender.innerHTML = 'client(e)';
    seler.innerHTML = 'vendeur';
    price.innerHTML = `montant`;
    dateTime.innerHTML = 'date';
  } else {
    sender.innerHTML = 'client';
    seler.innerHTML = 'seller';
    price.innerHTML = `amount`;
    dateTime.innerHTML = 'date';
  }
  setChild(transBox,sender);setChild(transBox,seler);
  setChild(transBox,price);setChild(transBox,dateTime);
  const lineHr = newEl('hr');
  setChild(dashboardContent,lineHr);
  setChild(dashboardContent,transBox);
  data.transactions !== 'no transactions' ? data.transactions.map(el => {
    const transBox = newEl('div');
    if (localStorage.getItem('theme-mood') === 'dark') {
      setClass(transBox,'trans-box dark');
    } else {
      setClass(transBox,'trans-box light');
    }
    const sender = newEl('span');setClass(sender,'trans-box__sender');sender.innerHTML = el.sender_id;
    const seler = newEl('span');setClass(seler,'trans-box__seler');seler.innerHTML = el.seler_id;
    const price = newEl('span');setClass(price,'trans-box__price');price.innerHTML = `${el.money}$`
    const dateTime = newEl('span');setClass(dateTime,'trans-box__date-time');dateTime.innerHTML = el.created_at
    setChild(transBox,sender);setChild(transBox,seler);
    setChild(transBox,price);setChild(transBox,dateTime);
    setChild(dashboardContent,transBox)
  }): ``;

}

const fetch_user_sales = async () => {
  const response = await fetch(`${siteName}/orders/user/sales`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
    }
  });
  const data = await response.json();
  return data;
}
const clientInfo = async (id) => {
  const response = await fetch(`${siteName}/orders/client/info/${id}`,{
    method: 'GET',
    cors: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
    }
  });
  const data = await response.json();
  clientInfoFunc(data.info[0])
}
const clientInfoFunc = (data) => {
  // create dark background
  const darkBg = newEl('div');setClass(darkBg,'client-info__dark-bg');darkBg.style.display = 'block';
  setChild(selectEl('body'),darkBg);
  // create client-info-box 
  const infoBox = newEl('div');
  const name = newEl('h4');const country = newEl('h4');const city = newEl('h4');
  const address = newEl('h4');const email = newEl('h4');const phone = newEl('h4');
  if (localStorage.getItem('theme-mood') === 'dark') {
    setClass(infoBox,'client-info__info-box dark');
  } else {
    setClass(infoBox,'client-info__info-box light');
  }
  if (localStorage.getItem('language') === 'ar') {
    infoBox.style.direction = 'rtl';
    name.innerHTML = `الإسم: ${data.name}`;
    country.innerHTML = `البلد: ${data.country}`;
    city.innerHTML = `المدينة: ${data.city}`;
    address.innerHTML = `العنوان: ${data.address}`;
    email.innerHTML = `البريد الإلكتروني: ${data.email}`;
    phone.innerHTML = `الهاتف: ${data.phone}`;
  } else if (localStorage.getItem('language') === 'fr') {
    infoBox.style.direction = 'ltr';
    name.innerHTML = `Nom: ${data.name}`;
    country.innerHTML = `Pays: ${data.country}`;
    city.innerHTML = `Ville: ${data.city}`;
    address.innerHTML = `Adresse: ${data.address}`;
    email.innerHTML = `E-mail: ${data.email}`;
    phone.innerHTML = `Téléphone: ${data.phone}`;
  } else {
    infoBox.style.direction = 'ltr';
    name.innerHTML = `Name: ${data.name}`;
    country.innerHTML = `Country: ${data.country}`;
    city.innerHTML = `City: ${data.city}`;
    address.innerHTML = `Address: ${data.address}`;
    email.innerHTML = `Email: ${data.email}`;
    phone.innerHTML = `phone: ${data.phone}`;
  }
  infoBox.style.display = 'block';
  setChild(infoBox,name);setChild(infoBox,country);setChild(infoBox,city);
  setChild(infoBox,address);setChild(infoBox,email);setChild(infoBox,phone);
  setChild(selectEl('body'),infoBox);
  darkBg.onclick = () => {
    darkBg.style.display = 'none';infoBox.style.display = 'none';
    document.body.removeChild(darkBg);document.body.removeChild(infoBox);
  }

}

const salesContent = async () => {
  is_loading(dashboardContent);
  const data = await fetch_user_sales();
  dashboardContent.textContent = '';
  const row = newEl('div');setClass(row,'row');
  data.user_sales !== 'no sales' ? data.user_sales.map(el=> {
    const product = newEl('div');setClass(product,'sales-product');
    const productBox = newEl('div');setClass(productBox,'sales-product__box')
    const image = newEl('img');setClass(image,'sales-product__box__image');
    const name = newEl('h4');setClass(name,'sales-product__box__name');

    const options = newEl('div');setClass(options,'sales-product__options');
    const color = newEl('span');setClass(color,'sales-product__options__color');
    const colorText = newEl('h5');setClass(colorText,'sales-product__options__color__text');
    const size = newEl('span');setClass(size,'sales-product__options__size');
    const sizeText = newEl('h5');setClass(sizeText,'sales-product__options__size__text');
    const quantity = newEl('h5');setClass(quantity,'sales-product__options__quantity mt-2');
    color.style.backgroundColor = el.color;
    size.innerHTML = el.size;
    const products = data.result
    let user_product;
    products.map(x=> {
      if (x.id === el.product_id) {
        user_product = x;
      }
    })
    image.src = `${siteName}/media/${user_product.image}`;
    const clientInfoBtn = newEl('button');
    setClass(clientInfoBtn,'btn btn-warning w-100 border border-2 border-dark fw-bold fs-4 rounded');
    clientInfoBtn.onclick = () => clientInfo(el.order_id);
    const language = () => {
      if (localStorage.getItem('language') === 'ar') {
        name.innerHTML = user_product.name_ar;
        colorText.textContent = `اللون:`;
        sizeText.textContent = `الحجم:`;
        quantity.innerHTML = `الكمية: ${el.quantity}`;
        clientInfoBtn.textContent = 'معلومات العميل';
      } else if (localStorage.getItem('language') === 'fr') {
        name.innerHTML = user_product.name_fr;
        colorText.textContent = `Couleur:`;
        sizeText.textContent = `Taille:`;
        quantity.innerHTML = `Quantité: ${el.quantity}`;
        clientInfoBtn.textContent = 'INFO-CLIENT';
      } else {
        name.innerHTML = user_product.name_en;
        colorText.textContent = `Color:`;
        sizeText.textContent = `Size:`;
        quantity.innerHTML = `Quantity: ${el.quantity}`;
        clientInfoBtn.textContent = 'CLIENT-INFO';
      }
    }
    const theme = () => {
      if (localStorage.getItem('theme-mood') === 'dark') {
        setClass(product,'sales-product dark');
        setClass(name,'sales-product__box__name dark');
      } else {
        setClass(product,'sales-product light');
        setClass(name,'sales-product__box__name light');
      }
    }
    language();
    theme();
    name.onclick = () => window.location.assign(`${siteName}/product/details/${data.result[el.seller_id].id}`);
    const col6 = newEl('div');setClass(col6,'col-lg-6');
    const emptyBox = newEl('div');setClass(emptyBox,'empty-box');
    const lineHr = newEl('hr');
    setChild(productBox,image);
    setChild(productBox,name);
    setChild(product,productBox);
    el.color ? setChild(options,colorText) : '';
    el.color ? setChild(options,color) : setChild(options,emptyBox);
    el.size ? setChild(options,sizeText) : '';
    el.size ? setChild(options,size) : setChild(options,emptyBox);
    setChild(options,quantity);
    setChild(options,lineHr);
    setChild(options,clientInfoBtn)
    setChild(product,options);
    setChild(col6,product);
    setChild(row,col6);
    setChild(dashboardContent,row);

  }): no_products(dashboardContent);
}

const fetchPurchases = async () => {
  const response = await fetch(`${siteName}/orders/user/purchases`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
    }
  });
  const data = await response.json();
  return data;
}


const purchasesContent = async () => {
  is_loading(dashboardContent);
  const data = await fetchPurchases();
  data ? dashboardContent.textContent = '' : '';
  data.products.length > 0 ? data.products.map(async (el) => {
    const container = elc('div','container-fluid mt-2');
    const box = elc('div','purchase-box')
    const row = elc('div','row')
    const col6 = elc('div','col-sm-6 col-md-4 col-lg-3')
    const col_6 = elc('div','col-sm-6  col-md-8 col-lg-9');
    const product = elc('div','purchase-box__product')
    const image = elc('img','purchase-box__product__image')
    const name = elc('h3','purchase-box__product__name');
    const info = elc('div','purchase-box__info');
    const options = elc('h3','purchase-box__info__options');
    const optionsBox = elc('div','purchase-box__info__optionsBox')
    const color = elc('span','purchase-box__info__optionsBox__color'),size = elc('span','purchase-box__info__optionsBox__size');
    const quantity = elc('h3','purchase-box__info__quantity');
    const logistic = elc('h3','purchase-box__info__logistic');
    const sellerProfile = elc('h5','purchase-box__info__seler');

    const user_purcheses = data.user_purcheses
    let user_purchase;
    user_purcheses.map(x=> {
      if (x.product_id === el.id) {
        user_purchase = x;
      }
    })
    color.style.backgroundColor = user_purchase.color;
    size.innerHTML = user_purchase.size;
    image.src = `${siteName}/media/${el.image}`;
    if (localStorage.getItem('language') === 'ar') {
      name.innerHTML = el.name_ar;
      options.textContent = 'الإختيارات:';
      quantity.innerHTML = `الكمية: ${user_purchase.quantity}`;
      logistic.textContent = `تتبع الخدمات اللوجستية: ${user_purchase.logistic}`;
      sellerProfile.innerHTML = `الملف التعريفي للبائع`
    } else if (localStorage.getItem('language') === 'fr') {
      name.innerHTML = el.name_fr;
      options.textContent = 'Options:';
      quantity.innerHTML = `Quantité: ${user_purchase.quantity}`;
      logistic.textContent = `Suivi Logistique: ${user_purchase.logistic}`;
      sellerProfile.innerHTML = 'Profil du vendeur';
    } else {
      name.innerHTML = el.name_en;
      options.textContent = 'Options:';
      quantity.innerHTML = `Quantity: ${user_purchase.quantity}`;
      logistic.textContent = `Logistics Tracking: ${user_purchase.logistic}`;
      sellerProfile.innerHTML = 'Seller Profile';
    }
    if (localStorage.getItem('theme-mood') === 'dark') {
      setClass(box,'purchase-box dark');
      setClass(product,'purchase-box__product dark');
      setClass(info,'purchase-box__info dark');
      setClass(color,'purchase-box__info__optionsBox__color dark');
      setClass(size,'purchase-box__info__optionsBox__size dark');
      setClass(sellerProfile,'purchase-box__info__seler dark');
    } else {
      setClass(box,'purchase-box light');
      setClass(product,'purchase-box__product light'); 
      setClass(info,'purchase-box__info light');
      setClass(color,'purchase-box__info__optionsBox__color light');
      setClass(size,'purchase-box__info__optionsBox__size light');
      setClass(sellerProfile,'purchase-box__info__seler light');
    }
    setChild(box,row);setChild(row,col6);setChild(row,col_6);
    setChild(col6,product);setChild(product,image);setChild(product,name);
    setChild(col_6,info);setChild(info,options);setChild(info,optionsBox);
    user_purchase.color ? setChild(optionsBox,color) : '';
    user_purchase.size ? setChild(optionsBox,size) : '';
    setChild(info,quantity);
    setChild(info,logistic);
    setChild(info,sellerProfile);
    // clientReview(info);
    const get_res = await fetch(`${siteName}/orders/client/review/${el.id}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken
      }
    });
    const get_data = await get_res.json();
    const rev_stars = newEl('span');rev_stars.innerHTML = `(${get_data.result})`;setClass(rev_stars,'rev_stars');
    for (let i=1;i<=5;i++) {
      const star = newEl('i');
      star.setAttribute('index',i);
      if (i <= get_data.result) {
        setClass(star,'fa-solid fa-star star-review');
      } else {
        setClass(star,'fa-regular fa-star star-review');
      }
      setChild(info,star);
    }
    setChild(info,rev_stars);
    const stars = Array.from(info.querySelectorAll('.star-review'));
    stars.map(_el=> {
      let index = _el.getAttribute('index')
      _el.onmousemove = () => {
        for (let i = 1;i <= parseInt(index);i++) {
          stars[i-1].classList.add('active')
        }
      }
      _el.onmouseout = () => {
        for (let i = 1;i <= parseInt(index);i++) {
          stars[i-1].classList.remove('active')
        }
      }
      _el.onclick = async() => {
        stars.map(x=> x.classList = 'fa-regular fa-star star-review')
        for (let i = 1;i <= parseInt(index);i++) {
          stars[i-1].classList = 'fa-solid fa-star star-review'
        }
        const response = await fetch(`${siteName}/orders/client/review/${el.id}`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
          },
          body: JSON.stringify({'stars':index})
        })
        const data = await response.json()
        rev_stars.innerHTML = `(${data.result})`
      }
    })
    const message = newEl('div');setClass(message,'input-group my-1');setChild(info,message);
    message.innerHTML = `
      <input type="text" class="form-control input-review-comment" placeholder="Send Review Comment" aria-label="Send Review Comment" aria-describedby="send-review-comment">
      <span class="input-group-text" id="send-review-comment"><i class="fa-solid fa-paper-plane"></i></span>
    `
    setChild(container,box);
    setChild(dashboardContent,container);
    const inputComment = message.querySelector('.input-review-comment');
    const sendComment = message.querySelector('#send-review-comment');
    const get_comment_res = await fetch(`${siteName}/orders/client/review/comment/${el.id}`,{
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
      }
    })
    const get_comment_data = await get_comment_res.json();
    inputComment.value = get_comment_data.result
    sendComment.onclick = async () => {
      const response = await fetch(`${siteName}/orders/client/review/comment/${el.id}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({'comment': inputComment.value})
      });
    };
    product.onclick = () => window.location.assign(`${siteName}/product/details/${el.id}`);
    sellerProfile.onclick = () => window.location.assign(`${siteName}/accounts/profile/${el.user_id}`);
  }) : no_products(dashboardContent);
}
const dashboardTheme = () => {
  const dashboardList = selectEl('.dashboard-list');
  if (localStorage.getItem('theme-mood') === 'dark') {
    dashboardList.classList = 'dashboard-list dark';
    wallet.style.backgroundColor = '#d4052e';
    sales.style.backgroundColor = '#04012b';
    purchases.style.backgroundColor = '#04012b';
    wallet.style.color = '#eee';
    sales.style.color = '#eee';
    purchases.style.color = '#eee';
  } else {
    dashboardList.classList = 'dashboard-list light';
    wallet.style.backgroundColor = '#d4052e';
    sales.style.backgroundColor = '#fff';
    purchases.style.backgroundColor = '#fff';
    wallet.style.color = '#eee';
    sales.style.color = '#212121';
    purchases.style.color = '#212121';
  }
}
const dashboard = () => {
  dashboardContent.textContent === '' ? walletContent() : '';
  if (localStorage.getItem('theme-mood') === 'dark') {
    wallet.style.backgroundColor = '#d4052e';
    sales.style.backgroundColor = '#04012b';
    purchases.style.backgroundColor = '#04012b';
    wallet.style.color = '#eee';
    sales.style.color = '#eee';
    purchases.style.color = '#eee';
  } else {
    wallet.style.backgroundColor = '#d4052e';
    sales.style.backgroundColor = '#fff';
    purchases.style.backgroundColor = '#fff';
    wallet.style.color = '#eee';
    sales.style.color = '#212121';
    purchases.style.color = '#212121';
  }
  wallet.onclick = () => {
    dashboardContent.textContent = '';
    if (localStorage.getItem('theme-mood') === 'dark') {
      wallet.style.backgroundColor = '#d4052e';
      sales.style.backgroundColor = '#04012b';
      purchases.style.backgroundColor = '#04012b';
      wallet.style.color = '#eee';
      sales.style.color = '#eee';
      purchases.style.color = '#eee';
    } else {
      wallet.style.backgroundColor = '#d4052e';
      sales.style.backgroundColor = '#fff';
      purchases.style.backgroundColor = '#fff';
      wallet.style.color = '#eee';
      sales.style.color = '#212121';
      purchases.style.color = '#212121';
    }
    walletContent();
  }
  sales.onclick = () => {
    dashboardContent.textContent = '';
    if (localStorage.getItem('theme-mood') === 'dark') {
      wallet.style.backgroundColor = '#04012b';
      sales.style.backgroundColor = '#d4052e';
      purchases.style.backgroundColor = '#04012b';
      wallet.style.color = '#eee';
      sales.style.color = '#eee';
      purchases.style.color = '#eee';
    } else {
      wallet.style.backgroundColor = '#fff';
      sales.style.backgroundColor = '#d4052e';
      purchases.style.backgroundColor = '#fff';
      wallet.style.color = '#212121';
      sales.style.color = '#eee';
      purchases.style.color = '#212121';
    }

    salesContent();
  }
  purchases.onclick = () => {
    dashboardContent.textContent = '';
    if (localStorage.getItem('theme-mood') === 'dark') {
      wallet.style.backgroundColor = '#04012b';
      sales.style.backgroundColor = '#04012b';
      purchases.style.backgroundColor = '#d4052e';
      wallet.style.color = '#eee';
      sales.style.color = '#eee';
      purchases.style.color = '#eee';
    } else {
      wallet.style.backgroundColor = '#fff';
      sales.style.backgroundColor = '#fff';
      purchases.style.backgroundColor = '#d4052e';
      wallet.style.color = '#212121';
      sales.style.color = '#212121';
      purchases.style.color = '#eee';
    }

    purchasesContent();
  }
}

const dashboardLanguage = async () => {
  if (localStorage.getItem('language') === 'ar') {
    wallet.textContent = 'المحفظة';
    sales.textContent = 'المبيعات';
    purchases.textContent = 'المشتريات';
  } else if (localStorage.getItem('language') === 'fr') {
    wallet.textContent = 'POCHETTE';
    sales.textContent = 'VENTES';
    purchases.textContent = 'ACHATS';
  } else {
    wallet.textContent = 'WALLET';
    sales.textContent = 'SALES';
    purchases.textContent = 'PURCHASES';
  }
}
dashboard();
dashboardLanguage();
dashboardTheme();

