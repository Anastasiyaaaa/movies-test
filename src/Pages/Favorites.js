import {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {NavLink} from "react-router-dom";

import {movieActions, uiActions} from "../store";
import {changeMovieFavorite, getAllMovies} from "../lib/api";
import FavoriteItem from "../components/Favorites/FavoriteItem";
import classes from '../components/UI/CardSection.module.css';

const Favorites = () => {

  const dispatch = useDispatch();
  const favorites = useSelector(state => state.movie.favMovies);

  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState('');

  useEffect(() => {
    const favoritesRequest = async () => {
      const allMovieItems = await getAllMovies();
      await dispatch(movieActions.setFavoriteMovies(allMovieItems));
      setIsLoading(false)
    }
    favoritesRequest().catch(error => {
      setIsLoading(false);
      setHttpError(error.message);
      uiActions.notifications({
        status: 'error',
        title: 'Error!',
        message: 'Error with getting your favorite movie!',
      })

    })

  }, [dispatch])


  if (isLoading) {
    return <h1> Loading </h1>
  }
  if (httpError) {
    return <h1> {httpError} </h1>
  }
  if (favorites.length === 0 && !isLoading) {
    const navStyle = {
      color: '#ffffff',
      textAlign: 'center',
      marginTop: '6rem'
    }
    return <Fragment>
      <h1> You haven't added any movies to fav </h1>
      <h2 style={navStyle}>
        <NavLink to='/main-page' style={{color: 'white'}}> GO to main page</NavLink>
      </h2>
    </Fragment>
  }

  const removeFromFavHandler = async (item) => {
    await changeMovieFavorite(item.id, item.favorites);
    await dispatch(movieActions.removeFavItem(item.id));
  }

  const clearFavoritesHandler = () => {
    //I think it should be done by backend
    favorites.forEach(async i => {
      await changeMovieFavorite(i.id, i.favorites)
    })
    dispatch(movieActions.clearFavorites())
  }

  const favoriteItem = favorites.map((item, i) => {
    return <FavoriteItem
      key={i}
      item={item}
      onRemoveFromFav={removeFromFavHandler}
    />
  })

  return (
    <section className={classes.cardSection}>
      <h2>Your favorite Movies</h2>
      <ul>
        {favoriteItem}
      </ul>
      <button className={classes.clearAll} onClick={clearFavoritesHandler}>Clear All</button>
    </section>
  );
};

export default Favorites;
