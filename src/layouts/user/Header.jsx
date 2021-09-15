import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import getCookie from '../../utils/CookieUtils';

function Header(props) {
  const username = getCookie("username")
  const { onClickCart } = props;
  function onClickLogout(params) {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "fullname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login"
  }
  return (
    <header className="pl-155 pr-155 intelligent-header">
      <div className="header-area header-area-2">
        <div className="container-fluid p-0">
          <div className="row no-gutters">
            <div className="col-lg-3 col-md-6 col-6">
              <div className="logo">
                <a href="index.html"><img src="/assets/assets/img/logo/logo.png" alt="" /></a>
              </div>
            </div>
            <div className="col-lg-6 menu-none-block menu-center">
              <div className="main-menu">
                <nav>
                  <ul>
                    <li><Link to="/">home</Link></li>
                    <li><a href="about-us.html">about us</a></li>
                    <li><a href="shop-grid-view-5-col.html">shop</a></li>
                    <li><Link to="/cart">Cart</Link></li>
                    <li><Link to="/myorder">My Order</Link></li>
                    <li><a href="/login" onClick={onClickLogout}>{username ? "LOGOUT":"LOGIN"}</a></li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-6">
              <div className="header-search-cart">
                <div className="header-search common-style">
                  <button className="sidebar-trigger-search">
                    <span className="ion-ios-search-strong" />
                  </button>
                </div>
                <div className="header-cart common-style">
                  <button className="sidebar-trigger" onClick={onClickCart}>
                    <span className="ion-bag" />
                  </button>
                </div>
                <div className="header-sidebar common-style">
                  <button className="header-navbar-active">
                    <span className="ion-navicon" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;