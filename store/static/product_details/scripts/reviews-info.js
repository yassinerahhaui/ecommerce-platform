const fetchProductReviews = async (url,id) => {
  const res = await fetch(`${url}${id}`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
    },
    mode: 'same-origin',
  });
  const data = await res.json();
  return data.reviews_info[0];
}
const reviewsResult = async (resultStatusContainer,resultD,url,id) => {
  const data = await fetchProductReviews(url,id);
  resultD.textContent = '';
  resultStatusContainer.textContent = '';

  const commentsBox = Array.from(document.querySelectorAll('.review-comment'));
  if (localStorage.getItem('theme-mood') === 'dark') {
    setClass(resultStatusContainer,'reviews__details__status dark');
    commentsBox.map((el)=> setClass(el,'review-comment mb-2 dark'));
  } else {
    setClass(resultStatusContainer,'reviews__details__status');
    commentsBox.map((el)=> setClass(el,'review-comment mb-2'));
  }
  const contain = createEl('div');
  setClass(contain,'status-reviews');
  for (let i = 5; i >= 1; i--) {
    const starPer = [data.starsPer1,data.starsPer2,data.starsPer3,data.starsPer4,data.starsPer5];
    const elDiv = createEl('div');
    setClass(elDiv,'status-el');

    const leftDiv = createEl('div');
    setClass(leftDiv,'status-left')
    const starNum = createEl('span');
    starNum.textContent = i;
    setClass(starNum,'stars-num') 
    const star = createEl('i');
    setClass(star,'fa-solid fa-star star')

    const middleDiv = createEl('div');
    setClass(middleDiv,'status-middle');
    const resultContain = createEl('span');
    setClass(resultContain,'status-free');
    const result = createEl('span');
    result.style.width = `${starPer[i-1].toFixed(2)}%`;
    setClass(result,'status-solid');

    const rightDiv = createEl('div');
    rightDiv.textContent = `${starPer[i-1].toFixed(0)}%`;
    setClass(rightDiv,'status-right');
    
    // left div
    setChild(leftDiv,starNum);
    setChild(leftDiv,star);
    // middle div
    setChild(middleDiv,resultContain);
    setChild(resultContain,result);

    setChild(elDiv,leftDiv);
    setChild(elDiv,middleDiv);
    setChild(elDiv,rightDiv);
    setChild(contain,elDiv);
  }
  setChild(resultStatusContainer,contain);

  for (let i = 1; i <= 5; i++) {
    const star = createEl('i');
    if (i <= data.reviews) {
      setClass(star,'fa-solid fa-star star');
    }else {
      if (i-1 < data.reviews) {
        setClass(star,'fa-solid fa-star-half-stroke star');
      } else {
        setClass(star,'fa-regular fa-star star');
      }
    }
    setChild(resultD,star);
  }
  const starsNum2 = createEl('span');
  setClass(starsNum2,'stars-num');
  starsNum2.textContent = data.reviews.toPrecision(2);
  const allUserRate2 = createEl('span');
  allUserRate2.textContent = `(${data.allUserRate})`;
  setClass(allUserRate2,'all-user-rate');
  if (localStorage.getItem('theme-mood') === 'dark') {
    setClass(resultD,'reviews__details__result dark');
  } else {
    setClass(resultD,'reviews__details__result');
  }
  setChild(resultD,starsNum2);
  setChild(resultD,allUserRate2);
  const starsItems = Array.from(document.querySelectorAll('.review-comment__body__stars'));
  if (starsItems) {
    starsItems.map((el)=> {
      const starResult  = el.textContent
      el.textContent = '';
      el.style.direction = 'ltr';
      if (localStorage.getItem('language') === 'ar') {
        el.style.textAlign = 'right'
      } else {
        el.style.textAlign = 'left'
      }
      for (let i = 1; i <= 5; i++) {
        const star = createEl('i');
        if (i <= starResult) {
          setClass(star,'fa-solid fa-star star');
        }else {
          if (i-1 < starResult) {
            setClass(star,'fa-solid fa-star-half-stroke star');
          } else {
            setClass(star,'fa-regular fa-star star');
          }
        }
        setChild(el,star);
      }
      const result = newEl('span');
      setClass(result,'stars-result');
      result.textContent = ` ${starResult}`;
      setChild(el,result);
    })
  }
}

