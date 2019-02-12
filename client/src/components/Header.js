import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
  return (
    <div className="ui inverted menu">
      <Link to="/" className=" active item">
        Fit App
      </Link>
      <GoogleAuth />
    </div>

  );
};

export default Header;
