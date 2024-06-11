const search_product = async (name) => {
  const response = await fetch(`${siteName}/search/engine?name=${name}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
    }
  })
  const data = response.json();
  return data
}
searchBar.onkeyup = async (e) => {
  const search_result_box = selectEl('.search-bar-box');
  if (e.target.value !== '') {
    search_result_box.style.display = 'block';
    let data = await search_product(e.target.value);
    data = data.results_10
    search_result_box.textContent = '';
    data.length > 0 ? data.map(el => {
      const product_box = newEl('div');setClass(product_box,'search-bar-box__product');
      const product_name = newEl('h5');setClass(product_name,'search-bar-box__product__name');
      const product_img = newEl('img');setClass(product_img,'search-bar-box__product__img');
      product_img.src = `${siteName}/media/${el.image}`;
      if (localStorage.getItem('language') === 'ar') {
        product_name.innerHTML = el.name_ar;
      } else if (localStorage.getItem('language') === 'fr') {
        product_name.innerHTML = el.name_fr;
      } else {
        product_name.innerHTML = el.name_en;
      }
      setChild(product_box,product_img);
      setChild(product_box,product_name);
      setChild(search_result_box,product_box)
      product_box.onclick = () => window.location.assign(`${siteName}/product/details/${el.id}`)
    }) : '';
  } else {
    search_result_box.style.display = 'none';
  }
};