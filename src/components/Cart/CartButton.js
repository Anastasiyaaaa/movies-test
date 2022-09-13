import {useDispatch, useSelector} from "react-redux";

import {uiActions} from '../../store'
import classes from './CartButton.module.css';

const CartButton = () => {

  const dispatch = useDispatch();

  const showCartHandler = () => {
    dispatch(uiActions.showCart());
  }

  const cartQuantity = useSelector(state => state.movie.quantity);

  return (
    <button onClick={showCartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
