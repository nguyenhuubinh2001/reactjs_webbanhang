import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Category from '../../components/admin/categories/Category'
import User from '../../components/admin/users/User'
import Product from '../../components/admin/products/Product'
import callApi from "../../callAPI/apiCaller";
import getCookie from "../../utils/CookieUtils";
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import Order from "../../components/admin/orders/Order";
import RevenueStatistic from "../../components/admin/statistic/RevenueStatistic";
function AdminLayout(props) {
  const token = getCookie("token");
  const { enqueueSnackbar } = useSnackbar();
  const showNoti = (message, variant) => {
    enqueueSnackbar(message, { variant: variant });
  }
  function onClickLogout(params) {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "fullname=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login"
  }

  useEffect(() => {
    callApi("admin", 'GET', null, null,
      {
        Authorization: `Bearer ${token}`,
      }
    ).then((response) => {


    }).catch((error) => {
      const status = error.response.status;
      if (status == 401) {
        showNoti("Vui lòng đăng nhập", "error")
        window.location.href = '/user'
      }
      if (status == 403) {
        showNoti("Không có quyền Admin", "error")
        window.location.href = '/user'
      }
    })
  }, [])
  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Topbar />
          <div className="container-fluid">
            <Switch>
              <Route path="/admin/listCategory" component={Category} />
              <Route path="/admin/listProduct" component={Product} />
              <Route path="/admin/listUser" component={User} />
              <Route path="/admin/listOrder" component={Order} />
              <Route path="/admin/statistical" component={RevenueStatistic} />
            </Switch>
          </div>
        </div>
      </div>


      {/* Logout Modal */}
      <div className="modal fade" id="logoutModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
              <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">Do you want to sign out?</div>
            <div className="modal-footer">
              <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
              <a className="btn btn-primary" onClick={onClickLogout}>Logout</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
