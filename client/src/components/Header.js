import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
  return (
    <div className="ui inverted menu">
      <Link to="/" className=" active item">
        Fit App
      </Link>
      <div className="right menu">
        <div class="item">
          <div class="ui facebook button">
            <i class="facebook icon"></i>
            Facebook
            </div>
        </div>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;
