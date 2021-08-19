import React, { useState, useEffect, useRef } from "react";
import callApi from "../../../callAPI/apiCaller";
import getCookie from "../../../utils/CookieUtils";
import TableCategory from "./TableCategory";
import PaginationTable from "../PaginationTable";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from 'react-redux';
import { actOnPageChange, loadCategoryByPage} from '../actions/category'
import CategoryForm from "./CategoryForm";
import { useSnackbar } from 'notistack';
function Category(props) {
    const dispatch = useDispatch();


    const isDisplay = useSelector(state => state.category.isDisplay)
    const pagination = useSelector(state => state.category.pagination)
    const trangHienTai = useRef(0);
   
    //Chuyển trang
    function handleOnPageChange(params) {
        trangHienTai.current = params;
        dispatch(actOnPageChange(params))
    }

    
    //Mở form danh mục
    function updateCategory(e, value) {
        const newValue = { ...value };
       
    }


   

    
    const elmTaskForm = isDisplay ? <CategoryForm
        
    /> : ""

    const elmTaskTable = isDisplay ? "" : <TableCategory
        onClickUpdate={updateCategory}
    />

    const elmTaskPagination = isDisplay ? "" : <PaginationTable
        pagination={pagination}
        onPageChange={handleOnPageChange}
    />

    return (
        <div className="container">
            <h3 className="text-center mt-3 mb-3">Quản lý danh mục</h3>
            <hr />
            <div>
                {elmTaskForm}
                {elmTaskTable}
                <div align="center">{elmTaskPagination}</div>
            </div>
        </div>
    );
}

export default Category;
