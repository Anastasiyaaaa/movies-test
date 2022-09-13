import {useDispatch, useSelector} from "react-redux";
import {movieActions, uiActions} from "../../store";

import Card from '../UI/Card';
import CartItem from './CartItem';
import {addMovieToCart} from "../../lib/api";
import classes from './Cart.module.css';
import {Fragment} from "react";

const Cart = () => {

  const dispatch = useDispatch();
  const cartMovies = useSelector(state => state.movie.cartMovies);

  const cartClasses = [
    classes.cart,
    classes.cartOpen
  ]

  const deleteItemHandler = (id) => {
    dispatch(movieActions.removeItem(id));
  }
  const addItemHandler = (item) => {
    dispatch(movieActions.addItem(item));
  }
  const deleteAllItemsHandler = () => {
    dispatch(movieActions.clearCart());
  }

  const confirmHandler = async () => {
    const data = {
      items: cartMovies
    }
    try {
      const response = await addMovieToCart(data);
      dispatch(
        uiActions.notifications({
          status: 'success',
          title: "HTTP success",
          message: 'Congratulation, your order is successful!',
        })
      );
      deleteAllItemsHandler();
      return true;
    } catch (error) {
      dispatch(
        uiActions.notifications({
          status: 'error',
          title: 'Error!',
          message: 'Fetching cart data failed!',
        })
      );
    }
  }

  const cartItems = cartMovies.map(i =>
    <CartItem
      key={i.title}
      item={{title: i.title, name: i.name, quantity: i.quantity, total: i.totalPrice, price: i.price}}
      onDelet={deleteItemHandler}
      onAdd={addItemHandler}
    />
  )

  const actionButtons = <Fragment>
    <button onClick={deleteAllItemsHandler}>Clear all</button>
    <button onClick={confirmHandler}>Order</button>
  </Fragment>

  return (
    <Card className={cartClasses.join(' ')}>
      <h2>Your Movie Cart</h2>
      <ul>
        {cartItems}
      </ul>
      {cartMovies.length >= 1 &&
        actionButtons
      }
    </Card>
  );
};

export default Cart;
