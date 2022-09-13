import classes from './CartItem.module.css';

const CartItem = (props) => {
  const { name, title, quantity, total, price } = props.item;

  const deleteButtonHandler = (e) => {
    e.preventDefault();
    props.onDelet(title);
  };
  const addButtonHandler = (e) => {
    e.preventDefault();
    props.onAdd(props.item);
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{name}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={deleteButtonHandler}>-</button>
          <button onClick={addButtonHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
