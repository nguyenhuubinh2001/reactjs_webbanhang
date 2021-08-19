import React from 'react';
import * as Config from '../../callAPI/Config'
import Checkbox from '@material-ui/core/Checkbox';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {useSnackbar } from 'notistack';


function Cart(props) {
    const { datas, onClickRemove, onClickRowCart, onChangeInput, handleChangeChk, subtotal, datasChecked } = props;
    const { enqueueSnackbar } = useSnackbar();
    const showNoti = (message, variant) => {
        enqueueSnackbar(message, { variant: variant });
    }

    function test(datasChecked) {
        
    }

    function checkOrder(e) {
        if(datasChecked.length==0){
            showNoti("Vui lòng chọn sản phẩm","error")
        }
    }
    return (
        <div className="cart-main-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <h1 className="cart-heading">Cart</h1>
                        <form action="#">
                            <div className="table-content table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="product-price"></th>
                                            <th className="product-price">images</th>
                                            <th className="product-name">Product</th>
                                            <th className="product-price">Price</th>
                                            <th className="product-quantity">Quantity</th>
                                            <th className="product-subtotal">Total</th>
                                            <th className="product-name">remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {datas.map((value, index) => (
                                            <tr key={index} onMouseDown={(e) => onClickRowCart(e, value)}>
                                                <td className="product-thumbnail">
                                                    <Checkbox
                                                        defaultChecked={false}
                                                        type="checkbox"
                                                        onChange={(e) => handleChangeChk(e, value)}
                                                        color="primary"
                                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                    />
                                                </td>
                                                <td className="product-thumbnail">
                                                    <a style={{ cursor: "pointer" }} ><img style={{ height: '80px', width: '80px' }} src={`${Config.API_URL}/images/` + value.product.image} alt="" /></a>
                                                </td>
                                                <td className="product-name"><a style={{ cursor: "pointer" }}>{value.product.name} </a></td>
                                                <td className="product-price"><span className="amount">{new Intl.NumberFormat().format(value.product.price)}<sup>đ</sup></span></td>
                                                <td className="product-quantity">
                                                    <input defaultValue={value.quantity} type="number" min={1} max={9} onChange={onChangeInput} />
                                                </td>
                                                <td className="product-subtotal">{new Intl.NumberFormat().format(value.price)}<sup>đ</sup></td>
                                                <td className="product-remove"><a style={{ cursor: "pointer" }} onClick={onClickRemove}><i className="ion-android-close" /></a>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <div className="coupon-all">
                                        <div className="coupon">
                                            <input id="coupon_code" className="input-text" name="coupon_code" placeholder="Coupon code" type="text" />
                                            <input className="button" name="apply_coupon" value="Apply coupon" type="submit" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-5 ml-auto">
                                    <div className="cart-page-total">
                                        <h2>Cart totals</h2>
                                        <ul>
                                            <li>Subtotal<span>{new Intl.NumberFormat().format(subtotal)}<sup>đ</sup></span></li>
                                            <li>Total<span>{new Intl.NumberFormat().format(subtotal)}<sup>đ</sup></span></li>
                                        </ul>
                                        <Link to={datasChecked.length==0? (location) => `${location.pathname}`:"/checkout"} onClick = {checkOrder}>Proceed to checkout</Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;