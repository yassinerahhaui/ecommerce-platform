const pagination = (container,productBox,data,storage,responsive) => {
   data.then(
    (res) => {
      is_loading(container);
      container.textContent = '';
      const pages = res.pages
      page = res.page
      const paginatorNav = document.createElement('nav');
      const paginationUl = document.createElement('ul');
      paginationUl.classList = 'pagination justify-content-center';
      // prev start
      const prev = document.createElement('li');
      const prevLink = document.createElement('a');
      const prevIcon = document.createElement('i');
      prevIcon.classList = 'fa-solid fa-caret-left';
      prevLink.classList.add('page-link');
      prev.classList.add('page-item');
      // prev end
      // next start
      const next = document.createElement('li');
      const nextLink = document.createElement('a');
      const nextIcon = document.createElement('i');
      nextIcon.classList = 'fa-solid fa-caret-right';
      nextLink.classList.add('page-link');
      next.classList.add('page-item');
      // next end
      prevLink.appendChild(prevIcon);
      prev.appendChild(prevLink);
      nextLink.appendChild(nextIcon);
      next.appendChild(nextLink);
      paginationUl.appendChild(prev);
      

      for (let i = 1; i <= (pages+0.9); i++) {
        const pageNumLi = document.createElement('li');
        const pageNumLink = document.createElement('a');
        pageNumLi.classList.add('page-item');
        pageNumLink.classList.add('page-link');
        if (i == page) {
          pageNumLi.classList.add('paginationActive')
        }
        pageNumLink.textContent = i;
        pageNumLi.appendChild(pageNumLink);
        paginationUl.appendChild(pageNumLi);
        pageNumLi.addEventListener('click', async () => {
          const pnl = Array.from(document.querySelectorAll('.pagination .page-item'));
          pnl.map(_=> _.classList = 'page-item');
          sessionStorage.setItem(storage,i);
          page = i;
          pageNumLi.classList.add('paginationActive');
        
          productBox.textContent = '';
          if (localStorage.getItem('language') === 'ar') {
            await fetchProducts('تخفيض','نفذ من المخزن','ar',productBox,fetchProductCard(url,page),responsive);
          } else if (localStorage.getItem('language') === 'en') {
            await fetchProducts('SALE','STOCK OUT','en',productBox,fetchProductCard(url,page),responsive);
          } else if (localStorage.getItem('language') === 'fr') {
            await fetchProducts('SOLDE','FIN DE STOCK','fr',productBox,fetchProductCard(url,page),responsive);
          }
          page >= pages ? next.classList = 'page-item disabled': next.classList = 'page-item';
          page <= 1 ? prev.classList = 'page-item disabled': prev.classList = 'page-item';
        })
      }
      prev.addEventListener('click',async ()=> {
        if (page > 1) {
          const pnl = Array.from(document.querySelectorAll('.pagination .page-item'));
          sessionStorage.setItem(storage,page-=1);
          pnl.map(_=> {
            _.classList = 'page-item';
            _.textContent == page ? _.classList.add('paginationActive') : '';
          });
        
          productBox.textContent = '';
          if (localStorage.getItem('language') === 'ar') {
            await fetchProducts('تخفيض','نفذ من المخزن','ar',productBox,fetchProductCard(url,page),responsive);
          } else if (localStorage.getItem('language') === 'en') {
            await fetchProducts('SALE','STOCK OUT','en',productBox,fetchProductCard(url,page),responsive);
          } else if (localStorage.getItem('language') === 'fr') {
            await fetchProducts('SOLDE','FIN DE STOCK','fr',productBox,fetchProductCard(url,page),responsive);
          }
        }
        page >= pages ? next.classList = 'page-item disabled': next.classList = 'page-item';
        page <= 1 ? prev.classList = 'page-item disabled': prev.classList = 'page-item';
      })
      paginationUl.appendChild(next);
      next.addEventListener('click',async ()=> {
        if (page < pages) {
          const pnl = Array.from(document.querySelectorAll('.pagination .page-item'));
          sessionStorage.setItem(storage,page+=1);
          pnl.map(_=> {
            _.classList = 'page-item';
            _.textContent == page ? _.classList.add('paginationActive') : '';
          });
        
          productBox.textContent = '';
          if (localStorage.getItem('language') === 'ar') {
            await fetchProducts('تخفيض','نفذ من المخزن','ar',productBox,fetchProductCard(url,page),responsive);
          } else if (localStorage.getItem('language') === 'en') {
            await fetchProducts('SALE','STOCK OUT','en',productBox,fetchProductCard(url,page),responsive);
          } else if (localStorage.getItem('language') === 'fr') {
            await fetchProducts('SOLDE','FIN DE STOCK','fr',productBox,fetchProductCard(url,page),responsive);
          }
        }
        page >= pages ? next.classList = 'page-item disabled': next.classList = 'page-item';
        page <= 1 ? prev.classList = 'page-item disabled': prev.classList = 'page-item';
      })
      page >= pages ? next.classList = 'page-item disabled': next.classList = 'page-item';
      page <= 1 ? prev.classList = 'page-item disabled': prev.classList = 'page-item';
      paginatorNav.appendChild(paginationUl);
      res.pages > 1 ? container.appendChild(paginatorNav) : '';
      paginatorNav.style.direction = 'ltr';
    });
}