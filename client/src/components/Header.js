import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';



const Header = () => {
  return (
    <div>
      <Link to="/" className=" active item">
        App
      </Link>
      <GoogleAuth />
    </div>

  );
};




export default Header;


