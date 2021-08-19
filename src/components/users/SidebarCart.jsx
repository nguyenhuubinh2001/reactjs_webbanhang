import React, { useEffect, useState } from 'react';
import callApi from '../../callAPI/apiCaller';
import getCookie from '../../utils/CookieUtils';
import * as Config from '../../callAPI/Config'
import { data } from 'jquery';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
function SidebarCart(props) {
    const { onClickClose, datas } = props

    function getTotal(datas) {
        let total = 0;
        datas.forEach(element => {
            let price = element.quantity* element.product.price;
            total += price
        });
        return total
    }

    return (
        <div className="sidebar-cart onepage-sidebar-area" id='sidebar-cart'>
            <div className="wrap-sidebar">
                <div className="sidebar-cart-all">
                    <div className="sidebar-cart-icon">
                        <button className="op-sidebar-close" id="op-sidebar-close" onClick={onClickClose}><span className="ion-android-close" /></button>
                    </div>
                    <div className="cart-content">
                        <h3>Shopping Cart</h3>
                        <ul>
                            {
                                datas.map((value, index) => (
                                    <li key={index} className="single-product-cart">
                                        <div className="cart-img">
                                            <a href="#"><img style={{ height: '80px', width: '80px' }} src={`${Config.API_URL}/images/` + value.product.image} alt="" /></a>
                                        </div>
                                        <div className="cart-title">
                                            <h3><a href="#"> {value.product.name}</a></h3>
                                            <span>{value.quantity} x {new Intl.NumberFormat().format(value.product.price)}<sup>đ</sup> </span>
                                        </div>
                                        <div className="cart-delete">
                                            <a href="#"><i className="ion-ios-trash-outline" /></a>
                                        </div>
                                    </li>
                                ))
                            }

                            <li className="single-product-cart">
                                <div className="cart-total">
                                    <h4>Total : <span>{new Intl.NumberFormat().format(getTotal(datas))}<sup>đ</sup> </span></h4>
                                </div>
                            </li>
                            <li className="single-product-cart">
                                <div className="cart-checkout-btn">
                                    <Link to="/cart"><a className="btn-hover cart-btn-style" href="#">view cart</a></Link>
                                    <a className="no-mrg btn-hover cart-btn-style" href="#">checkout</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SidebarCart;