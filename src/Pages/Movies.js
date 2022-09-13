import MovieItem from '../components/Shop/MovieItem';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {movieActions, uiActions} from "../store";
import {changeMovieFavorite, getAllMovies} from "../lib/api";
import classes from '../components/UI/CardSection.module.css';

const Movies = () => {
  const dispatch = useDispatch();
  const movies = useSelector(state => state.movie.availableMovies);
  const favorites = useSelector(state => state.movie.favMovies);

  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState('');

  useEffect(() => {
    const moviesRequest = async () => {
      const movieItems = await getAllMovies();
      dispatch(movieActions.setMovies(movieItems));
      setIsLoading(false)
    }
    moviesRequest().catch(error => {
      setIsLoading(false);
      setHttpError(error.message);
      dispatch(
        uiActions.notifications({
          status: 'error',
          title: 'Error!',
          message: 'Fetching movies data failed!',
        })
      );
    })

  }, [dispatch, favorites])


  const addToFavHandler = async (item) => {
    try {
      await changeMovieFavorite(item.id, item.favorites);
      dispatch(movieActions.addFavItem(item));
      dispatch(
        uiActions.notifications({
          status: 'success',
          title: "Success added",
          message: 'Congratulation, you added movie to favorites!',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.notifications({
          status: 'error',
          title: 'Error!',
          message: 'Error with Adding your favorite movie!',
        })
      );
    }
  }

  if (isLoading) {
    return <h1> Loading </h1>
  }

  if (httpError) {
    return <h1> {httpError} </h1>
  }

  const addToCartHandler = (id) => {
    dispatch(movieActions.addItem(id));
  }

  const movieItem = movies.map((item, i) => {
    return <MovieItem
      key={i}
      item={item}
      actions={{
        onAddToCart: addToCartHandler,
        onAddToFav: addToFavHandler
      }}
    />
  })

  return (
    <section className={classes.cardSection}>
      <h2>Buy your favorite Movies</h2>
      <ul>
        {movieItem}
      </ul>
    </section>
  );
};

export default Movies;
