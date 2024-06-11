const fetchProductSlider = async (id) => {
  const response = await fetch(`${siteName}/product/details/slider/${id}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken
    }
  })
  const data = await response.json()
  return data.slider
}
const sliderContainer = selectEl('.slider-full .slider-container')

const productSlider = async () => {
  const data = await fetchProductSlider(DetailsId)
  data.length > 0 ? data.map(pr=> {
    const product = newEl('div');setClass(product,'product-slider')
    const image = newEl('img');setClass(image,'product-slider__img')
    const name = newEl('h4');setClass(name,'product-slider__name')
    image.src = `${siteName}/media/${pr.image}`
    if (localStorage.getItem('language') === 'ar') {
      name.innerHTML = pr.name_ar
    } else if (localStorage.getItem('language') === 'fr') {
      name.innerHTML = pr.name_fr
    } else {
      name.innerHTML = pr.name_en
    }
    setChild(product,image);setChild(product,name);setChild(sliderContainer,product)
    product.onclick = () => window.location.assign(`${siteName}/product/details/${pr.id}`)
  }) : ''
}
productSlider()