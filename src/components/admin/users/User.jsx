import React, { useState, useEffect, useRef } from "react";
import callApi from "../../../callAPI/apiCaller";
import getCookie from "../../../utils/CookieUtils";
import UserTable from "./UserTable";
import PaginationTable from "../PaginationTable";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import UserForm from "./UserForm";
import getRoles from "../../../utils/getRoles";
import getListRole from "../../../utils/getListRole";
import { useSnackbar } from 'notistack';
function User(props) {
    const { enqueueSnackbar } = useSnackbar();
    const showNoti = (message, variant) => {
        enqueueSnackbar(message, { variant: variant });
    }

    const token = getCookie("token");
    const [datas, setDatas] = useState([]);

    const dataDefault = {
        id: "",
        username: "",
        fullname: "",
        password: "",
        passwordConfirm: "",
        email: "",
        photo: "",
        roles: [

        ]
    };

    const [data, setData] = useState(dataDefault);


    const [isDisplay, setIsDisplay] = useState(false);

    const trangHienTai = useRef(0);

    const [filters, setFilters] = useState({
        pageNumber: 0,
        pageSize: 5,
        sortDirection: "",
        sortBy: "",
    });

    const [pagination, setPagination] = useState({
        page: filters.pageNumber + 1,
        limit: filters.pageSize,
        max: 1,
    });



    const [openConFirm, setOpenConFirm] = React.useState(false);
    const handleClose = () => {
        setOpenConFirm(false);
    };

    useEffect(() => {
        callApi(
            "admin/users/getAllByPage",
            "GET",
            null,
            {
                pageNumber: filters.pageNumber,
                pageSize: filters.pageSize,
                sortDirection: filters.sortDirection,
                sortBy: filters.sortBy,
            },
            {
                Authorization: `Bearer ${token}`,
            }
        )
            .then((response) => {
                const { data } = response;
                setDatas(data);
            })
            .catch((error) => {
                console.log(error);
            });

        callApi("admin/users/getAll", "GET", null, null, {
            Authorization: `Bearer ${token}`,
        })
            .then((response) => {
                const { data } = response;
                setPagination({
                    ...pagination,
                    page: filters.pageNumber + 1,
                    max: data.length,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, [filters]);


    //Chuyển trang
    function handleOnPageChange(params) {
        trangHienTai.current = params;
        setFilters({
            ...filters,
            pageNumber: params - 1,
        });
    }

    //Hiện table và ẩn form
    function isShowTable(params) {
        setIsDisplay(false);
        setData({
            ...dataDefault,
        });
    }
    //Hiện form và ẩn table
    function isShowForm(params) {
        setIsDisplay(true);
        setData({
            ...dataDefault,
        });
    }

    //ClickRow
    function onClickRow(value) {
        const newValue = { ...value };
        let roles = getRoles(newValue.roles)
        newValue.roles = roles;
        setData(
            newValue,
        );
    }

    //Mở confirm xóa
    function deleteUser(e, value) {
        setOpenConFirm(true);
    }

    //Xóa danh mục
    function yesDeleteUser(params) {
        callApi(`admin/users/delete/${data.id}`, "GET", null, null, {
            Authorization: `Bearer ${token}`,
        })
            .then((response) => {
                const { data } = response;
                if (response.status == 200) {
                    showNoti("Xóa thành công", "success")
                    setFilters({
                        ...filters,
                    });
                } else {
                    showNoti("Xóa thất bại", "error")
                }
            })
            .catch((error) => {
                showNoti("Xóa thất bại", "error")
            });
        setOpenConFirm(false);
    }

    //Mở form danh mục
    function updateUser(e, value) {
        const newValue = { ...value };
        setData(newValue)
        setIsDisplay(true);
    }

    //onChange input
    function onChangeInput(e) {
        const target = e.target
        const name = target.name
        const value = target.value
        setData({
            ...data,
            [name]: value,
        })
    }

    //Cập nhật or thêm danh mục
    function saveUser(e) {
        callApi(`admin/users/createOrUpdate`, 'POST', {
            id: data.id,
            username: data.username,
            fullname: data.fullname,
            password: data.password,
            passwordConfirm: data.passwordConfirm,
            email: data.email,
            photo: data.photo,
            roles: getListRole(data.roles)
        }, null, {
            Authorization: `Bearer ${token}`,
        }).then((response) => {
            if (response.status == 200) {
                setIsDisplay(false)
                setFilters({
                    ...filters
                })
                showNoti("Lưu thành công", "success")
            } else {
                showNoti("Lưu thất bại", "error")
            }
        }).catch((error) => {
            showNoti("Lưu thất bại", "error")
        });
    }


    //Sắp xếp theo các trường
    function onClickSortByName(e) {
        const name = e.target.getAttribute('name')
        if (e.target.className == "fas fa-sort-alpha-down ml-3") {
            setFilters({
                ...filters,
                sortDirection: "DESC",
                sortBy: name
            })
            e.target.className = "fas fa-sort-alpha-up ml-3"
        } else if (e.target.className == "fas fa-sort-alpha-up ml-3") {
            setFilters({
                ...filters,
                sortDirection: "ASC",
                sortBy: name
            })
            e.target.className = "fas fa-sort-alpha-down ml-3 df"
        } else {
            setFilters({
                ...filters,
                sortDirection: "",
                sortBy: ""
            })
            e.target.className = "fas fa-sort-alpha-down ml-3"
        }
    }
    const elmTaskForm = isDisplay ? <UserForm
        data={data}
        onChangeInput={onChangeInput}
        submitForm2={saveUser}
        onclickBack={isShowTable}
    /> : ""

    const elmTaskTable = isDisplay ? "" : <UserTable
        datas={datas}
        onClickRow={onClickRow}
        onClickDelete={deleteUser}
        onClickUpdate={updateUser}
        onClickAdd={isShowForm}
        onClickSortByName={onClickSortByName}
    />

    const elmTaskPagination = isDisplay ? "" : <PaginationTable
        pagination={pagination}
        onPageChange={handleOnPageChange}
    />

    return (
        <div className="container">
            <h3 className="text-center mt-3 mb-3">Quản lý tài khoản</h3>
            <hr />
            <div>
                {elmTaskForm}
                {elmTaskTable}
                <div align="center">{elmTaskPagination}</div>
            </div>
            <Dialog
                open={openConFirm}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Delete Category"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có chắc chắn muốn xóa User này không ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button id="noDelete" onClick={handleClose} color="primary">
                        Không
                    </Button>
                    <Button onClick={yesDeleteUser} color="primary" autoFocus>
                        Có
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default User;
