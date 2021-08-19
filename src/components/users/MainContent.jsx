import React from 'react';
import * as Config from '../../callAPI/Config'
import PaginationUser from '../../layouts/user/PaginationUser'
function MainContent(props) {
    const { singleProductFilter, products, onClickProduct, product, onClickAddCart, pagination, handleOnPageChange } = props
    return (
        <div className="shop-filters-right" id='shop-filters-right'  style={{ minHeight: '764px',backgroundColor:'white',paddingTop:'30px',paddingRight:'30px',paddingBottom:'30px'}}>
            <div className="shop-bar-area pb-60" style={{paddingLeft:'30px'}}>
                <div className="shop-bar">
                    <div className="shop-found-selector" >
                        <div className="shop-found">
                            <p><span>23</span> Product Found of <span>50</span></p>
                        </div>
                        <div className="shop-selector">
                            <label>Sort By : </label>
                            <select name="select">
                                <option value>Default</option>
                                <option value>A to Z</option>
                                <option value> Z to A</option>
                                <option value>In stock</option>
                            </select>
                        </div>
                    </div>
                    <div className="shop-filter-tab">
                        <div className="shop-filter">
                            <a className="shop-filter-active" onClick={singleProductFilter} href="#">Filters <i className="ion-android-options" /></a>
                        </div>
                        <div className="shop-tab nav" role="tablist">
                            <a className="active" href="#grid-5-col1" data-toggle="tab" role="tab" aria-selected="false">
                                <i className="ion-android-apps" />
                            </a>
                            <a href="#grid-5-col2" data-toggle="tab" role="tab" aria-selected="true">
                                <i className="ion-android-menu" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shop-product-content tab-content" style={{paddingLeft:'25px'}}>
                <div id="grid-5-col1" className="tab-pane fade active show">
                    <div className="row custom-row">
                    {
                    products.length==0 ? <h3>Không có sản phẩm nào</h3> : 
                            

                            products.map((value, index) => (
                                <div className="custom-col-5 custom-col-style" key={index} >
                                    <div className="single-product mb-35"  onClick={(e) => onClickProduct(e, value)}>
                                        <div className="product-img">
                                            <a href="javascript:;"><img src={`${Config.API_URL}/images/` + value.image} alt="" /></a>
                                            <div className="product-action">
                                                <a title="Wishlist" className="animate-left" href="javascript:void(0)"><i className="ion-ios-heart-outline" /></a>
                                                <a title="Quick View" data-toggle="modal" data-target="#exampleModal" className="animate-right" href="javascript:;"><i className="ion-ios-eye-outline" /></a>
                                            </div>
                                        </div>
                                        <div className="product-content">
                                            <div className="product-title-price">
                                                <div className="product-title">
                                                    <h4><a href="javascript:;">{value.name}</a></h4>
                                                </div>
                                                <div className="product-price">
                                                    <span>{new Intl.NumberFormat().format(value.price)}<sup>đ</sup></span>
                                                </div>
                                            </div>
                                            <div className="product-cart-categori">
                                                <div className="product-cart">
                                                    <span>Furniter</span>
                                                </div>
                                                <div className="product-categori">
                                                    <a onClick={(e) => onClickAddCart(e, value)} href="javascript:void(0)"><i className="ion-bag" /> Add to cart</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                   
                        

                    </div>
                </div>
                <div id="grid-5-col2" className="tab-pane fade">
                    <div className="row">
                        <div className="col-md-12 col-lg-12 col-xl-6">
                            <div className="single-product single-product-list product-list-right-pr mb-40">
                                <div className="product-img list-img-width">
                                    <a href="#"><img src="assets/assets/img/product/list-img/1.jpg" alt="" /></a>
                                    <div className="product-action">
                                        <a title="Quick View" data-toggle="modal" data-target="#exampleModal" className="animate-right" href="#"><i className="ion-ios-eye-outline" /></a>
                                    </div>
                                </div>
                                <div className="product-content-list">
                                    <div className="product-list-info">
                                        <h4><a href="#">Flying Drone with Remote</a></h4>
                                        <span>$150.00</span>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing el sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.</p>
                                    </div>
                                    <div className="product-list-cart-wishlist">
                                        <div className="product-list-cart">
                                            <a className="btn-hover list-btn-style" href="#">add to cart</a>
                                        </div>
                                        <div className="product-list-wishlist">
                                            <a className="btn-hover list-btn-wishlist" href="#"><i className="ion-ios-heart-outline" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    products.length == 0 ? "" : <PaginationUser
                        pagination={pagination}
                        onPageChange={handleOnPageChange}
                    />
                }

                {/* model */}
                <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-hidden="true">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span className="ion-android-close" aria-hidden="true" />
                    </button>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="qwick-view-left">
                                    <div className="quick-view-learg-img">
                                        <div className="quick-view-tab-content tab-content">
                                            <div className="tab-pane active show fade" id="modal1" role="tabpanel">
                                                <img
                                                    src={product.image == "" ? 'https://chiase24.com/wp-content/uploads/2020/07/gai-xinh.jpg' : `${Config.API_URL}/images/` + product.image}
                                                    alt="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="quick-view-list nav" role="tablist">
                                        <a className="active" href="#modal1" data-toggle="tab" role="tab" aria-selected="true">
                                            <img src="assets/assets/img/quick-view/s1.jpg" alt="" />
                                        </a>
                                        <a href="#modal2" data-toggle="tab" role="tab" aria-selected="false">
                                            <img src="assets/assets/img/quick-view/s2.jpg" alt="" />
                                        </a>
                                        <a href="#modal3" data-toggle="tab" role="tab" aria-selected="false">
                                            <img src="assets/assets/img/quick-view/s3.jpg" alt="" />
                                        </a>
                                    </div>
                                </div>
                                <div className="qwick-view-right">
                                    <div className="qwick-view-content">
                                        <h3>{product.name}</h3>
                                        <div className="price">
                                            <span className="new">{new Intl.NumberFormat().format(product.price)}<sup>đ</sup></span>
                                            <span className="old">{new Intl.NumberFormat().format(product.price + product.price * 0.1)}<sup>đ</sup></span>
                                        </div>
                                        <div className="rating-number">
                                            <div className="quick-view-rating">
                                                <i className="ion-ios-star red-star" />
                                                <i className="ion-ios-star red-star" />
                                                <i className="ion-android-star-outline" />
                                                <i className="ion-android-star-outline" />
                                                <i className="ion-android-star-outline" />
                                            </div>
                                            <div className="quick-view-number">
                                                <span>2 Ratting (S)</span>
                                            </div>
                                        </div>
                                        <p>Lorem ipsum dolor sit amet, consectetur adip elit, sed do tempor incididun ut labore et dolore magna aliqua. Ut enim ad mi , quis nostrud veniam exercitation .</p>
                                        <div className="quick-view-select">

                                            <div className="select-option-part">
                                                <label>Color*</label>
                                                <select className="select">
                                                    <option value>- Please Select -</option>
                                                    <option value>orange</option>
                                                    <option value>pink</option>
                                                    <option value>yellow</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="quickview-plus-minus">
                                            <div className="cart-plus-minus">
                                                <input type="number" min={0} max={9} name="qtybutton" className="cart-plus-minus-box" />
                                            </div>
                                            <div className="quickview-btn-cart">
                                                <a className="btn-hover-black" href="javascript:void(0)">add to cart</a>
                                            </div>
                                            <div className="quickview-btn-wishlist">
                                                <a className="btn-hover" href="javascript:void(0)"><i className="ion-ios-heart-outline" /></a>
                                            </div>
                                        </div>
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

export default MainContent;