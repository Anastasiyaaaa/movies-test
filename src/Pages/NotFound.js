import React from 'react';
import {NavLink} from "react-router-dom";

const NotFound = () => {

  const navStyle = {
    color: '#ffffff',
    textAlign: 'center',
    marginTop: '6rem'
  }

  return (
    <h1 style={navStyle}>
      Ooops, something wrong <br/>
      <NavLink to='/main-page' style={{color: 'white'}}> GO to main page</NavLink>
    </h1>
  );
};

export default NotFound;