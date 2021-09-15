import React from 'react';
import { Link} from "react-router-dom";
function Checkout(props) {
    const { submitCheckOut, datas } = props
    console.log(datas)
    function submitForm(e) {
        e.preventDefault();
        let firstName = document.getElementById('first-name').value,
            lastName = document.getElementById('last-name').value,
            streetAddress = document.getElementById('street-address').value,
            city = document.getElementById('city').value,
            state = document.getElementById('state').value,
            phone = document.getElementById('phone').value
        let address = firstName + ' ' + lastName + '. Địa chỉ: ' + streetAddress +' '+city+'. Điện thoại: ' + phone
        if (submitCheckOut) {
            submitCheckOut(address)
        }
    }

    function getTotal(datas) {
        let total = 0;
        datas.forEach(element => {
            let price = element.price;
            total += price
        });
        return total
    }
    return (
        <div className="checkout-area ">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-12">
                        <form action="#">
                            <div className="checkbox-form">
                                <h3>Checkout</h3>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="checkout-form-list">
                                            <label>First Name <span className="required">*</span></label>
                                            <input type="text" id='first-name' />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="checkout-form-list">
                                            <label>Last Name <span className="required">*</span></label>
                                            <input type="text" id='last-name' />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="checkout-form-list">
                                            <label>Company Name</label>
                                            <input type="text" />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="checkout-form-list">
                                            <label>Address <span className="required">*</span></label>
                                            <input type="text" placeholder="Street address" id='street-address' />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="checkout-form-list">
                                            <label>Town / City <span className="required">*</span></label>
                                            <input type="text" id='city' />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="checkout-form-list">
                                            <label>State / County <span className="required">*</span></label>
                                            <input type="text" id='state' />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="checkout-form-list">
                                            <label>Phone number <span className="required">*</span></label>
                                            <input type="text" id='phone' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-6 col-md-12 col-12">
                        <div className="your-order">
                            <h3>Your order</h3>
                            <div className="your-order-table table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="product-name">Product</th>
                                            <th className="product-total">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            datas.map((value, index) => (
                                                <tr key = {index} className="cart_item">
                                                    <td className="product-name">
                                                        {value.product.name} <strong className="product-quantity"> × {value.quantity}</strong>
                                                    </td>
                                                    <td className="product-total">
                                                        <span className="amount">{new Intl.NumberFormat().format(value.price)}<sup>đ</sup></span>
                                                    </td>
                                                </tr>
                                            ))
                                        }

                                    </tbody>
                                    <tfoot>
                                        <tr className="cart-subtotal">
                                            <th>Cart Subtotal</th>
                                            <td><span className="amount">{new Intl.NumberFormat().format(getTotal(datas))}<sup>đ</sup></span></td>
                                        </tr>
                                        <tr className="order-total">
                                            <th>Order Total</th>
                                            <td><strong><span className="amount">{new Intl.NumberFormat().format(getTotal(datas))}<sup>đ</sup></span></strong>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <div className="payment-method">
                                <div className="payment-accordion">
                                    <div className="order-button-payment">
                                       <input type="submit" value="Place order" onClick={submitForm} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Checkout;