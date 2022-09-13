import Card from '../UI/Card';
import CardItem from "../UI/CardItem";
import classes from '../UI/CardItem.module.css';

const FavoriteItem = (props) => {

  const {item, onRemoveFromFav } = props;

  return (
    <li className={classes.item}>
      <Card>
        <CardItem
          card='favorites'
          item={item}
          actions={onRemoveFromFav}
        />
      </Card>
    </li>
  );
};

export default FavoriteItem;
