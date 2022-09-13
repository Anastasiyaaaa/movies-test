import {NavLink} from "react-router-dom";

import CartButton from '../Cart/CartButton';
import classes from './MainHeader.module.css';

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <NavLink to='/main-page' className={classes.logo} activeClassName={classes.active}>Movies</NavLink>
          </li>
          <li>
            <NavLink to='/favorites' activeClassName={classes.active}>Favorites</NavLink>
          </li>
          <li>
            <CartButton/>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
