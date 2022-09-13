import {Fragment} from 'react';
import MainHeader from './MainHeader';
import Footer from "./Footer";

const Layout = (props) => {
  const mainClass = {
    paddingBottom: `5rem`,
  }

  return (
    <Fragment>
      <MainHeader/>
      <main style={mainClass}>{props.children}</main>
      <Footer/>
    </Fragment>
  );
};

export default Layout;
