const prName = window.location.href.split('?name=').slice('1').toString();
const product_card_box = selectEl('.search-page-box');
const search_result_title = selectEl('.search-result-title');
const search_results_card = selectEl('.search-result-card');
// const paginationBox = selectEl('.pagination-box');


// pagination(paginationBox,search_results_card,search_product(prName),'','col-sm-6 col-md-4 col-lg-3');

ar.onclick = () => { // change lang to arabic
  localStorage.setItem('language','ar');
  search_results_all(prName);
  category_list();
  language();
}
en.onclick = () => { // change lang to english
  localStorage.setItem('language','en');
  search_results_all(prName);
  category_list();
  language();
}
fr.onclick = () => { // change lang to frensh
  localStorage.setItem('language','fr');
  search_results_all(prName);
  category_list();
  language();
}

themeSwitchBtn.onclick = () => {
  if (localStorage.getItem('theme-mood') === 'dark') {
    localStorage.setItem('theme-mood','light');
    category_list();
    theme();
  } else {
    localStorage.setItem('theme-mood','dark');
    category_list();
    theme();
  }
  search_results_all(prName);
  chatRoomsTheme();
}

const search_results_all = async (name) => {
  if (localStorage.getItem('language') === 'ar') {
    search_result_title.textContent = 'نتائج البحث';
    await fetchProducts('تخفيض','نفذ من المخزن','ar',product_card_box,search_product(name),'col-sm-6 col-md-4 col-lg-3');
  } else if (localStorage.getItem('language') === 'fr') {
    search_result_title.textContent = 'RÉSULTATS DE RECHERCHE';
    await fetchProducts('SOLDE','FIN DE STOCK','fr',product_card_box,search_product(name),'col-sm-6 col-md-4 col-lg-3');
  } else {
    search_result_title.textContent = 'SEARCH RESULTS';
    await fetchProducts('SALE','STOCK OUT','en',product_card_box,search_product(name),'col-sm-6 col-md-4 col-lg-3');
  }
  no_products(product_card_box);
  if (localStorage.getItem('theme-mood') === 'dark') {
    search_result_title.classList = 'card-title search-result-title fs-1 fw-bolder text-light bg-danger p-3 border border-2 border-dark text-center rounded';
    search_results_card.classList = 'card my-5 rounded search-result-card bg-dark';
  } else {
    search_result_title.classList = 'card-title search-result-title fs-1 fw-bolder text-light bg-danger p-3 border border-2 border-light text-center rounded';
    search_results_card.classList = 'card my-5 rounded search-result-card bg-light';
  }
}
search_results_all(prName)
