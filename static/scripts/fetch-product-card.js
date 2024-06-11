const fetchProductCard = async (url,page) => {
  const response = await fetch(`${url}${page}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
      },
    });
  const data = await response.json();
  return data;
}