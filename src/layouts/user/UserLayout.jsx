import React, { useEffect, useRef, useState } from 'react';
import callApi from '../../callAPI/apiCaller';
import MainContent from '../../components/users/MainContent';
import SidebarCart from '../../components/users/SidebarCart';
import SideBarLeft from '../../components/users/SideBarLeft';
import getCookie from '../../utils/CookieUtils';
import Footer from './Footer';
import Header from './Header';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Cart from '../../components/users/Cart'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkout from '../../components/users/Checkout';
import { useSnackbar } from 'notistack';
import MyOrder from '../../components/users/MyOrder';
import OrderDetails from '../../components/users/OrderDetails';

function UserLayout(props) {
    const { enqueueSnackbar } = useSnackbar();
    const showNoti = (message, variant) => {
        enqueueSnackbar(message, { variant: variant });
    }
    const token = getCookie("token");
    const [filters, setFilters] = useState({
        pageNumber: 0,
        pageSize: 15,
        sortDirection: "",
        sortBy: ""
    })
    const trangHienTai = useRef(0)
    const [pagination, setPagination] = useState({
        page: filters.pageNumber + 1,
        limit: filters.pageSize,
        max: 1,
    });
    const [search, setSearch] = useState("")



    const [cartItems, setCartItems] = useState([]);
    const [cartItem, setCartItem] = useState({
        id: null,
        price: '',
        quantity: 1,
        product: {

        }
    })

    const [loadCart, setLoadCart] = useState({
        load: ''
    })

    const categoryDefault = {
        id: "",
        name: "",
        description: "",
    };
    const [category, setCategory] = useState(categoryDefault);

    const [products, setProducts] = useState([]);
    const productDefault = {
        id: null,
        name: "",
        image: "",
        price: "",
        createDate: "",
        available: 1,
        category: {

        },
    }
    const [product, setProduct] = useState(productDefault);

    const [loadOrder, setLoadOrder] = useState({

    })
    const [orders, setOrders] = useState([

    ])
    const [orderDetail, setOrderDetai] = useState({})
    const [isDisplay, setIsDisplay] = useState(false);
    function showOrderDetail(e,value) {
        setOrderDetai(value)
        setIsDisplay(true)
    }
    function onClickShowOrders(e) {
        setIsDisplay(false)
    }
    function deleteOrder(e,value) {
        callApi(`user/order/delete/${value.id}`, 'DELETE', null,null,
            {
                Authorization: `Bearer ${token}`,
            }
        ).then((response) => {
            if (response.status == 200) {
                setLoadOrder({
                    ...loadOrder
                })
                setIsDisplay(false)
                showNoti("Hủy đơn hàng thành công",'success')
            }
            if (response.status == 204) {
                showNoti("Hủy đơn hàng thất bại",'error')
            }

        }).catch((error) => {
            console.log(error)
            showNoti("Hủy đơn hàng thất bại",'error')
        })
    }

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const [subtotal, setSubtotal] = React.useState(0);
    const total = useRef(0);
    const datasChecked = useRef([]);
    function handleChangeChk(e, value) {
        if (e.target.checked) {
            const index = datasChecked.current.findIndex(element => element.id == value.id)
            if (index == -1) {
                total.current += value.price;
                datasChecked.current.push(value)
                setSubtotal(total.current)
            }

        } else {
            total.current -= value.price;
            const index = datasChecked.current.findIndex(element => element.id == value.id)
            datasChecked.current.splice(index, 1)
            setSubtotal(total.current)
        }
    }

    useEffect(() => {
        callApi("user/cartItem/getCart", "GET", null, null, {
            Authorization: `Bearer ${token}`,
        })
            .then((response) => {
                if (response.status == 200) {
                    const { data } = response;
                    setCartItems(data)
                }
                if (response.status == 204) {
                    setCartItems([

                    ])
                }
            })
    }, [loadCart]);

    useEffect(() => {
        callApi("admin/products/getAllByCategory", 'GET', null,
            {
                pageNumber: filters.pageNumber,
                pageSize: filters.pageSize,
                sortDirection: filters.sortDirection,
                sortBy: filters.sortBy,
                categoryId: category.id,
                search: search
            },
            {
                Authorization: `Bearer ${token}`,
            }
        ).then((response) => {

            if (response.status == 200) {
                const { data } = response;
                setProducts(data)
            }
            if (response.status == 204) {
                setProducts([

                ])
            }

        }).catch((error) => {
            console.log(error)
        })


        callApi("admin/products/getCount", 'GET', null,
            {
                categoryId: category.id,
                search: search
            },
            {
                Authorization: `Bearer ${token}`,
            }
        ).then((response) => {
            setPagination({
                ...pagination,
                page: filters.pageNumber + 1,
                max: response.data
            })
        }).catch((error) => {
            console.log(error)
        })
    }, [category, filters])

    useEffect(() => {
        callApi("user/order/getAllByUser", 'GET', null, null,
            {
                Authorization: `Bearer ${token}`,
            }
        ).then((response) => {
            if (response.status == 200) {
                const { data } = response;
                setOrders(data)
            }

            if (response.status == 204) {
                setOrders([

                ])
            }
        }).catch((error) => {
            console.log(error)
        })

    }, [loadOrder])

    function onClickCategory(e, value) {
        setCategory(value)
    }

    function onClickProduct(e, value) {
        const newValue = { ...value }
        setProduct(newValue)
    }


    function singleProductFilter(e) {
        e.preventDefault();
        let container = document.getElementById("shop-filters-left"),
            container1 = document.getElementById("shop-filters-right");
        if (container.className.includes("is-visible") || container1.className.includes("is-visible")) {
            container.className = "shop-filters-left";
            container1.className = "shop-filters-right"
            setCategory(categoryDefault)
        } else {
            container.className += ' is-visible';
            container1.className += ' is-visible'
        }
    }
    function showSidebarCart(e) {
        e.preventDefault();
        let sidebarCart = document.getElementById("sidebar-cart"),
            wrapper = document.getElementById("wrapper1");
        if (sidebarCart.className.includes("inside")) {

        } else {
            let div = document.createElement('div')
            div.className = "body-overlay"
            div.id = "body-overlay"
            sidebarCart.className = "sidebar-cart onepage-sidebar-area inside"
            wrapper.prepend(div);
            wrapper.className = "wrapper overlay-active"
        }
    }
    function closeSidebarCart(e) {
        e.preventDefault();
        let sidebarCart = document.getElementById("sidebar-cart"),
            container = document.getElementById('body-overlay')
        if (container) {
            container.remove()
        }
        sidebarCart.className = "sidebar-cart onepage-sidebar-area"

    }
    function onClickAddCart(e, value) {
        console.log(cartItem)
        callApi("user/cartItem/saveCart", 'POST',
            {
                id: null,
                price: 0,
                quantity: 1,
                product: value
            }, null,
            {
                Authorization: `Bearer ${token}`,
            }
        ).then((response) => {
            const { data } = response;
            if (response.status == 200) {
                setLoadCart({
                    ...loadCart
                })
                showNoti("Thêm vào giỏ hàng thành công", 'success')
            }
        }).catch((error) => {
            const status = error.response.status
            if (status == 401) {
                window.location.href = '/login'
                showNoti("Bạn vui lòng đăng nhập trước", 'error')
            }
        })
    }
    function onClickRowCart(e, value) {
        const newValue = { ...value }
        setCartItem(newValue)
    }


    function onChangeQuantity(e) {
        console.log("onchange")
        const quantity = e.target.value;
        if (quantity > 0 && quantity < 9) {
            callApi(`user/cartItem/update`, 'POST', {
                id: cartItem.id,
                quantity: quantity,
                price: cartItem.product.price * quantity,
                product: cartItem.product
            }, null,
                {
                    Authorization: `Bearer ${token}`,
                }
            ).then((response) => {
                const { data } = response;
                if (response.status == 200) {
                    setLoadCart({
                        ...loadCart
                    })
                    showNoti("Cập nhật thành công", 'success')
                }
                else {

                }

            }).catch((error) => {
                console.log(error)
                showNoti("Cập nhật thất bại", 'error')
            })
        }

    }


    function deleteCart() {
        handleClickOpen()
    }

    function yesDeleteCart() {
        callApi(`user/cartItem/delete/${cartItem.id}`, 'GET', null, null,
            {
                Authorization: `Bearer ${token}`,
            }
        ).then((response) => {
            const { data } = response;
            if (response.status == 200) {
                setLoadCart({
                    ...loadCart
                })
                showNoti("Xóa thành công", 'success')
            }
            else {
                showNoti("Xóa thất bại", 'error')
            }

        }).catch((error) => {
            console.log(error)
            showNoti("Xóa thất bại", 'error')
        })
        handleClose();
    }



    function submitCheckOut(address) {
        const dataOrder = datasChecked.current;
        if (dataOrder.length == 0) {
            showNoti("Vui lòng chọn sản phẩm trước", "error")
        }
        else {
            callApi(`user/order/save`, 'POST',
                {
                    dataOrder,

                },
                {
                    address
                },
                {
                    Authorization: `Bearer ${token}`,
                }
            ).then((response) => {
                const { data } = response;
                if (response.status == 200) {
                    showNoti("Đặt hàng thành công", "success")
                    setLoadCart({
                        ...loadCart
                    })
                    setLoadOrder({
                        ...loadOrder
                    })
                }
                else {

                }

            }).catch((error) => {
                console.log(error)
            })
        }

    }

    function onChangeSearch(e) {
        const value = e.target.value
        setSearch(value)
    }

    function onClickSearch(e) {
        e.preventDefault()
        setCategory({
            ...category
        })
    }

    function handleOnPageChange(params) {
        trangHienTai.current = params;
        console.log(params)
        setFilters({
            ...filters,
            pageNumber: params - 1
        })

    }
    return (
        <div className="wrapper" id="wrapper1" >
            <Header
                onClickCart={showSidebarCart}

            />
            <SidebarCart
                onClickClose={closeSidebarCart}
                datas={cartItems}
            />

            {/* main-search start */}
            <div className="cur-lang-acc-active">
                <div className="wrap-sidebar">
                    <div className="sidebar-nav-icon">
                        <button className="op-sidebar-close"><span className="ion-android-close" /></button>
                    </div>
                    <div className="cur-lang-acc-all">
                        <div className="single-currency-language-account">
                            <div className="cur-lang-acc-title">
                                <h4>Currency: <span>USD </span></h4>
                            </div>
                            <div className="cur-lang-acc-dropdown">
                                <ul>
                                    <li><a href="#">EUR  Euro</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="single-currency-language-account">
                            <div className="cur-lang-acc-title">
                                <h4>Language: <span><img src="assets/assets/img/icon-img/english.png" alt="" /> English </span></h4>
                            </div>
                            <div className="cur-lang-acc-dropdown">
                                <ul>
                                    <li><a href="#"><img src="assets/assets/img/icon-img/english.png" alt="" /> English </a></li>
                                    <li><a href="#"><img src="assets/assets/img/icon-img/es.png" alt="" /> spanish </a></li>
                                    <li><a href="#"><img src="assets/assets/img/icon-img/fr.png" alt="" /> french </a></li>
                                    <li><a href="#"><img src="assets/assets/img/icon-img/ge.png" alt="" /> german </a></li>
                                    <li><a href="#"><img src="assets/assets/img/icon-img/es.png" alt="" /> spanish </a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="single-currency-language-account">
                            <div className="cur-lang-acc-title">
                                <h4>My Account:</h4>
                            </div>
                            <div className="cur-lang-acc-dropdown">
                                <ul>
                                    <li><a href="#">Compare Products </a></li>
                                    <li><a href="#">Default welcome msg!</a></li>
                                    <li><a href="register.html">register</a></li>
                                    <li><a href="login.html">Sign In </a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="breadcrumb-area pt-205 pb-210 bg-img" style={{ backgroundImage: 'url(/assets/assets/img/bg/banner.jpg)' }}>
                <div className="container">
                    <div className="breadcrumb-content" style={{ aligh: 'right' }}>
                        <h2></h2>
                        <ul>
                            <li><a></a></li>
                            <li></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="shop-page-wrapper hidden-items padding-filter" style={{ minHeight: '430px' }}>
                <div className="container-fluid">
                    <Switch >
                        <Route path="/cart">
                            <Cart
                                datas={cartItems}
                                onClickRowCart={onClickRowCart}
                                onClickRemove={deleteCart}
                                onChangeInput={onChangeQuantity}
                                subtotal={subtotal}
                                datasChecked={datasChecked.current}
                                handleChangeChk={handleChangeChk}
                            />
                        </Route>
                        <Route path="/checkout">
                            <Checkout
                                submitCheckOut={submitCheckOut}
                                datas={datasChecked.current}
                            />
                        </Route>
                        <Route path="/myorder">
                            <MyOrder
                                datas={orders}
                                showOrderDetail = {showOrderDetail}
                                data = {orderDetail}
                                isDisplay = {isDisplay}
                                onClickShowOrders = {onClickShowOrders}
                                onClickDelete = {deleteOrder}
                            />
                        </Route>
                        <Route path="/">
                            <MainContent
                                product={product}
                                products={products}
                                singleProductFilter={singleProductFilter}
                                category={category}
                                onClickProduct={onClickProduct}
                                onClickAddCart={onClickAddCart}
                                pagination={pagination}
                                handleOnPageChange={handleOnPageChange}
                            />

                        </Route>


                    </Switch>
                    <SideBarLeft
                        onClickCategory={onClickCategory}
                        onChangeSearch={onChangeSearch}
                        search={search}
                        onClickSearch={onClickSearch}
                    />

                </div>
            </div>
            <Footer />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{""}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this item?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        No
                    </Button>
                    <Button onClick={yesDeleteCart} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default UserLayout;