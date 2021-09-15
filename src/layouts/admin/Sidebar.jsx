import React from "react";
import PropTypes from "prop-types";
import { Link, BrowserRouter as Router} from "react-router-dom";

function Sidebar(props) {
  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      {/* Sidebar - Brand */}
      <a className="sidebar-brand d-flex align-items-center justify-content-center">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink" />
        </div>
        <div className="sidebar-brand-text mx-3">Admin </div>
      </a>
      {/* Divider */}
      <hr className="sidebar-divider my-0" />
      {/* Nav Item - Dashboard */}
      <li className="nav-item active">
        <a className="nav-link">
          <i className="fas fa-fw fa-tachometer-alt" />
          <span>Thống kê báo cáo</span>
        </a>
      </li>
      {/* Divider */}
      <hr className="sidebar-divider" />
      {/* Heading */}
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseTwo"
          aria-expanded="true"
          aria-controls="collapseTwo"
        >
          <i className="fas fa-fw fa-cog" />
          <span>Danh mục</span>
        </a>
        <div
          id="collapseTwo"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Quản lý danh mục:</h6>
            <Link to="/admin/listCategory">
              <a className="collapse-item">Danh sách danh mục</a>
            </Link>
            <a className="collapse-item">Thêm danh mục</a>
          </div>
        </div>
      </li>
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseProducts"
          aria-expanded="true"
          aria-controls="collapseProducts"
        >
          <i className="fas fa-fw fa-wrench" />
          <span>Sản phẩm</span>
        </a>
        <div
          id="collapseProducts"
          className="collapse"
          aria-labelledby="headingProducts"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Quản lý sản phẩm:</h6>
            <Link to="/admin/listProduct">
              <a className="collapse-item">Danh sách sản phẩm</a>
            </Link>
            <a className="collapse-item">Thêm sản phẩm</a>
          </div>
        </div>
      </li>
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseCustomers"
          aria-expanded="true"
          aria-controls="collapseCustomers"
        >
          <i className="fas fa-fw fa-user" />
          <span>Tài khoản</span>
        </a>
        <div
          id="collapseCustomers"
          className="collapse"
          aria-labelledby="headingCustomers"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Quản lý tài khoản: </h6>
            <Link to="/admin/listUser">
              <a className="collapse-item">Danh sách tài khoản</a>
            </Link>
            <a className="collapse-item">Thêm tài khoản</a>
          </div>
        </div>
      </li>
      {/* Divider */}
      <hr className="sidebar-divider" />
      {/* Heading */}

      {/* Nav Item - Pages Collapse Menu */}
      <li className="nav-item">
        <Link to="/admin/listOrder">
          <a className="nav-link collapsed">
            <i className="fas fa-fw fa-folder" />
            <span>Đơn hàng</span>
          </a>
        </Link>
      </li>
      {/* Nav Item - Charts */}
      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseCustomers1"
          aria-expanded="true"
          aria-controls="collapseCustomers"
        >
          <i className="fas fa-fw fa-user" />
          <span>Thống kê</span>
        </a>
        <div
          id="collapseCustomers1"
          className="collapse"
          aria-labelledby="headingCustomers"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <Link to="/admin/statistical">
              <a className="collapse-item">Thông kê doanh thu</a>
            </Link>
            <a className="collapse-item">Thêm tài khoản</a>
          </div>
        </div>
      </li>
      {/* Nav Item - Tables */}
      <li className="nav-item">
        <a className="nav-link" href="tables.html">
          <i className="fas fa-fw fa-table" />
          <span>Đơn nhập kho</span>
        </a>
      </li>
      {/* Divider */}
      <hr className="sidebar-divider d-none d-md-block" />
      {/* Sidebar Toggler (Sidebar) */}
      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle" />
      </div>

    </ul>
  );
}

export default Sidebar;
