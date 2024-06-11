

let category_url = '/category/list';
const fetch_category_list = async (url) => {
  const res = await fetch(url,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
    }
  });
  const data = await res.json()
  return data.category;
}

const nav_category = selectEl('.nav-category');
const category_list = async () => {
  nav_category.textContent = '';
  const data = await fetch_category_list(category_url);
  data.map((el)=> {
    const categoryEl = createEl('div');
    const icon = createEl('img');
    const name = createEl('span');
    setClass(categoryEl,'category-el');
    setClass(icon,'category-el__icon');
    setClass(name,'category-el__name ');
    if (localStorage.getItem('theme-mood') === 'dark') {
      icon.src = `/media/${el.icon_dark}`;
    } else {
      icon.src = `/media/${el.icon_light}`;
    }
    if (localStorage.getItem('language') === 'ar') {
      name.textContent = el.name_ar;
      categoryEl.style.justifyContent = 'space-between';
    } else if (localStorage.getItem('language') === 'fr') {
      name.textContent = el.name_fr;
      categoryEl.style.justifyContent = 'left';
    } else {
      name.textContent = el.name_en;
      categoryEl.style.justifyContent = 'left';
    }
    categoryEl.onclick = () => window.location.href = `/product/list/${el.id}`;
    setChild(categoryEl,icon);
    setChild(categoryEl,name)
    setChild(nav_category,categoryEl);
  })
}
category_list();
