import React, {Fragment} from 'react';
import classes from "../UI/CardItem.module.css";

let buttons;

const CardItem = (props) => {

  const {card, item, actions} = props;

  const addButtonHandler = (e) => {
    e.preventDefault();
    actions.onAddToCart(item);
  }
  const addFavButtonHandler = async (e) => {
    e.preventDefault();
    await actions.onAddToFav(item);
  }
  const removeFavButtonHandler = (e) => {
    e.preventDefault();
    actions(item);
  }

  if (card === 'movies') {
    buttons = <Fragment>
      <div className={classes.actions}>
        <button onClick={addButtonHandler}>Add to Cart</button>
        {!item.favorites &&
          <button onClick={addFavButtonHandler}>Add to Favorites</button>
        }
      </div>
    </Fragment>
  } else {
    buttons = <div className={classes.actions}>
      <button onClick={removeFavButtonHandler}>Remove from Favorites</button>
    </div>
  }

  return (
    <div>
      <header>
        <h3>{item.name}</h3>
        <div className={classes.price}>${item.price.toFixed(2)}</div>
      </header>
      <p>{item.description}</p>
      {buttons}
    </div>
  );
};

export default CardItem;