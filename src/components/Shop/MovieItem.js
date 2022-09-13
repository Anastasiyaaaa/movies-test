import Card from '../UI/Card';
import classes from '../UI/CardItem.module.css';
import CardItem from "../UI/CardItem";

const MovieItem = (props) => {
  const {item, actions } = props;

  return (
    <li className={classes.item}>
      <Card>
        <CardItem
          card='movies'
          item={item}
          actions={actions}
        />
      </Card>
    </li>
  );
};

export default MovieItem;
