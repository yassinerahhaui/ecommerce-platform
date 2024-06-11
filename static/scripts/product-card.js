
const fetchProducts = async (sale_l,stock,name_l,container,fetchProduct,responsive) => {
    /* fetch arabic product start */

    /* create new element */
    is_loading(container);
    const products = await fetchProduct;
    products.results ? container.innerHTML = '' : '';
    products.results !== "no products!" ? products.results.map(async (pr)=> {
      const card_list =  newEl('div');
      const card = newEl('div');
      const p_media = newEl('div');
      const p_info = newEl('div');
      const image = newEl('img'); 
      const sale = newEl('span');
      const stock_out = newEl('span');
      const name = newEl('h5');
      const prices = newEl('div');
      const price = newEl('span');
      const old_price = newEl('span');
      const reviews = newEl('div');
      const reviewsResult = newEl('span');
      const allUserRate = newEl('span');
      const wichListIcon = newEl('i');
      
      
      let favorite = false;
      wichListIcon.classList = 'fa-solid fa-heart wish-list-btn';
      
      if (localStorage.getItem('language') === 'ar') {
        wichListIcon.title = 'أضف إلى قائمة الإهتمامات';
      } else if (localStorage.getItem('language') === 'fr') {
        wichListIcon.title = 'ajouter à la liste de souhaits';
      } else {
        wichListIcon.title = 'add to wish list';
      }
      wichListIcon.addEventListener('click',async () => {
        const res = await fetch(`${siteName}/add-to-favorite/${pr.id}`,{
          method: 'PUT',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
          },
          body: JSON.stringify({payload: pr.id})
        });
        let data = await res.json();
        favorite = data.favorite;
        if (favorite === false) {
          wichListIcon.style.color = '#eee';
        } else {
          wichListIcon.style.color = '#D50000';
        }
      })
      const in_favorite = async () => {
        const res = await fetch(`${siteName}/in-favorite/${pr.id}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
          }
        });
        const data = await res.json();
        favorite = await data.favorite;
        if (favorite === false) {
          wichListIcon.style.color = '#eee';
        } else {
          wichListIcon.style.color = '#D50000';
        }
      }
      in_favorite();
      card.appendChild(wichListIcon);
      if (products.user) {
        if (pr.user_id == products.user) {
          // edit product button
          const edit_link = newEl('a');
          const edit_icon = newEl('i');
          edit_link.href = `/product/edit/${pr.id}`;
          setClass(edit_icon,'fa-solid fa-pen-to-square');
          setClass(edit_link,'product-media__edit-link')
          setChild(edit_link,edit_icon);
          setChild(p_media,edit_link);
          // remove product button
          const remove_btn = elc('span','product-media__remove-btn');
          const remove_icon = elc('i','fa-solid fa-trash');
          setChild(remove_btn,remove_icon);
          setChild(p_media,remove_btn);
          remove_btn.onclick = () => {
            const remove_black_bg = elc('div','product-media__remove-btn__black-bg');
            const remove_box = elc('div','product-media__remove-btn__box');
            const remove_message = elc('h4','product-media__remove-btn__box__message my-5');
            const remove_cancel_icon = elc('i','fa-solid fa-xmark');
            const remove_cancel_btn = elc('span','product-media__remove-btn__box__cancel');
            const remove_confirm_btn = elc('button','btn btn-danger btn-lg fw-bold m-auto');
            if (localStorage.getItem('language') === 'ar') {
              remove_message.textContent = 'هل تريد حقا حذف هذا المنتج?';
              remove_confirm_btn.textContent = 'نعم';
            } else if (localStorage.getItem('language') === 'fr') {
              remove_message.textContent = 'Voulez-vous vraiment supprimer ce produit?';
              remove_confirm_btn.textContent = 'Oui';
            } else {
              remove_message.textContent = 'Do you really want to delete this product?';
              remove_confirm_btn.textContent = 'Yes';
            }
            setChild(remove_cancel_btn,remove_cancel_icon);
            setChild(remove_box,remove_cancel_btn);
            setChild(remove_box,remove_message);
            setChild(remove_box,remove_confirm_btn);
            container.appendChild(remove_black_bg);
            container.appendChild(remove_box);
            remove_black_bg.onclick = () => {
              remove_message.remove();
              remove_cancel_icon.remove();
              remove_cancel_btn.remove();
              remove_confirm_btn.remove();
              remove_black_bg.remove();
              remove_box.remove();
            }
            remove_cancel_btn.onclick = () => {
              remove_message.remove();
              remove_cancel_icon.remove();
              remove_cancel_btn.remove();
              remove_confirm_btn.remove();
              remove_black_bg.remove();
              remove_box.remove();
            }
            remove_confirm_btn.onclick = async () => {
              const response = await fetch(`${siteName}/product/delete/${pr.id}`,{
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'X-CSRFToken': csrftoken,
                }
              })
              const delete_res = await response.json();
              delete_res.result === 'product deleted!'? window.location.reload(): '';
            }
          }
          if (localStorage.getItem('language') === 'ar') {
            edit_link.title = 'تعديل المنتج';
            remove_btn.title = 'حذف المنتج';
          } else if (localStorage.getItem('language') === 'fr') {
            edit_link.title = 'Modifier le produit';
            remove_btn.title = 'Supprimer le produit';
          } else {
            edit_link.title = 'Edit Product';
            remove_btn.title = 'Remove Product';
          }
        }
      }

      image.src = `${siteName}/media/${pr.image}`;
      sale.textContent = `${sale_l} ${pr.salePer}%`;
      stock_out.textContent = stock;
      reviews.style.direction = 'ltr';
      if (name_l === 'ar') {
        card.title = pr.name_ar
        name.textContent = pr.name_ar;
        reviews.style.justifyContent = 'right';
        price.textContent = `${pr.price} د.م`;
        old_price.textContent = `${pr.old_price} د.م`;
      } else if (name_l === 'en') {
        card.title = pr.name_en
        name.textContent = pr.name_en;
        reviews.style.direction = 'ltr';
        reviews.style.justifyContent = 'left';
        price.textContent = `${pr.price} Dhs`;
        old_price.textContent = `${pr.old_price} Dhs`;
      } else if (name_l === 'fr') {
        card.title = pr.name_fr
        name.textContent = pr.name_fr;
        reviews.style.justifyContent = 'left';
        price.textContent = `${pr.price} Dhs`;
        old_price.textContent = `${pr.old_price} Dhs`;
      }
      image.onclick = () => window.location = `/product/details/${pr.id}`;
      name.onclick = () => window.location = `/product/details/${pr.id}`;
      
      reviewsResult.textContent = `${pr.reviews.toFixed(1)}`;
      allUserRate.textContent = `(${pr.allUserRate})`;

      card_list.classList = `${responsive} mb-3`;
      if (localStorage.getItem('theme-mood') === 'dark') {
        card.classList = 'product-card dark';
      } else {
        card.classList = 'product-card light';
      }
      p_media.classList = 'product-media';
      sale.classList = 'sale';
      stock_out.classList = 'stock-out';
      name.classList = 'product-name';
      reviews.classList = 'card-reviews';
      reviewsResult.classList = 'card-reviews__result';
      allUserRate.classList = 'card-reviews__allUserRate';


      prices.classList = 'prices';
      price.classList = 'price';
      old_price.classList = 'old-price';

      p_info.classList = 'product-info';

      p_media.appendChild(image);
      pr.sale === true ? p_media.appendChild(sale) : '';
      pr.stock_out === true ? p_media.appendChild(stock_out) : '';
      
      pr.name_ar !== '' ? p_info.appendChild(name): '';
      p_info.appendChild(reviews)
      
      for (let i = 1; i <= 5; i++) {
        const star = newEl('i');
        if (i <= pr.reviews) {
          star.classList = 'fa-solid fa-star';
        }else {
          const half = pr.reviews - i
          half > -1 ? star.classList = 'fa-regular fa-star-half-stroke' : star.classList = 'fa-regular fa-star';
        }
        star.classList.add('stars');
        reviews.appendChild(star);
      }
      reviews.appendChild(reviewsResult);
      reviews.appendChild(allUserRate);
      p_info.appendChild(prices);
      prices.appendChild(price);
      pr.old_price ? prices.appendChild(old_price): '';

      card.appendChild(p_media);
      card.appendChild(p_info);

      card_list.appendChild(card);

      container.appendChild(card_list);
      
    }) : '';
    products.results === 'no products!' ? no_products(container) : '';

    /* fetch arabic product end */
}




