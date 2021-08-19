import React from 'react';
import Category from './categories/Category';
function SideBarLeft(props) {
    const { onClickCategory,onChangeSearch, search, onClickSearch } = props;
    return (
        <div className="shop-filters-left" id="shop-filters-left" style={{paddingTop:'30px',paddingLeft:'30px'}}>
            <div className="shop-sidebar" >
                <div className="sidebar-widget mb-50">
                    <h3 className="sidebar-title">Search Products</h3>
                    <div className="sidebar-search">
                        <form action="#">
                            <input name="name"
                                id="name"
                                placeholder="Search Products..."
                                type="text" style={{
                                    height: '45px'
                                }}
                                onChange = {onChangeSearch}
                                value = {search}
                            />
                            <button onClick={onClickSearch}><i className="ion-ios-search-strong" /></button>
                        </form>
                    </div>
                </div>
                <Category
                    onClickCategory={onClickCategory}
                />
                <div className="sidebar-widget sidebar-overflow mb-45">
                    <h3 className="sidebar-title">color</h3>
                    <div className="product-color">
                        <ul>
                            <li className="red">b</li>
                            <li className="pink">p</li>
                            <li className="blue">b</li>
                            <li className="sky">b</li>
                            <li className="green">y</li>
                            <li className="purple">g</li>
                        </ul>
                    </div>
                </div>
                <div className="sidebar-widget mb-40">
                    <h3 className="sidebar-title">size</h3>
                    <div className="product-size">
                        <ul>
                            <li><a href="#">xl</a></li>
                            <li><a href="#">m</a></li>
                            <li><a href="#">l</a></li>
                            <li><a href="#">ml</a></li>
                            <li><a href="#">lm</a></li>
                        </ul>
                    </div>
                </div>
                <div className="sidebar-widget mb-50">
                    
                </div>
            </div>
        </div>
    );
}

export default SideBarLeft;