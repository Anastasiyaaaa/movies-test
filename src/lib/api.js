const FIREBASE_DOMAIN = 'https://movies-f6ffa-default-rtdb.firebaseio.com';

export async function getAllMovies() {
  const response = await fetch(`${FIREBASE_DOMAIN}/movies.json`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not fetch movies.');
  }

  const movieItems = [];

  for (const key in data) {
    const movieObj = {
      id: key,
      title: data[key].id,
      name: data[key].title,
      description: data[key].description,
      price: data[key].price,
      favorites: data[key].favorites,
    };

    movieItems.push(movieObj);
  }

  return movieItems;
}

export async function changeMovieFavorite(id, fav) {
  const response = await fetch(`${FIREBASE_DOMAIN}/movies/${id}.json`,
    {
      method: 'PATCH',
      body: JSON.stringify({favorites: !fav}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not add movie to favorites.');
  }
}

export async function addMovieToCart(data) {
  const response = await fetch(`${FIREBASE_DOMAIN}/cart-movies.json`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(response.message || 'Could not add movie.');
  }

  return response;
}


