import {Redirect, Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import {Fragment} from "react";

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Movies from './Pages/Movies';
import Notification from "./components/Notification/Notification";
import Favorites from "./Pages/Favorites";
import NotFound from "./Pages/NotFound";

function App() {

  const showCart = useSelector((state) => state.ui.cartVisible);

  return (
    <Fragment>
      <Notification />
      <Layout>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/main-page'/>
          </Route>
          <Route path='/main-page' exact>
            {showCart && <Cart/>}
            <Movies/>
          </Route>
          <Route path='/favorites'>
            {showCart && <Cart/>}
            <Favorites/>
          </Route>
          <Route path='*'>
            <NotFound/>
          </Route>
        </Switch>
      </Layout>
    </Fragment>
  );
}

export default App;