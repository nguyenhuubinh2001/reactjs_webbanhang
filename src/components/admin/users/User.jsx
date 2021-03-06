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


    //Chuy???n trang
    function handleOnPageChange(params) {
        trangHienTai.current = params;
        setFilters({
            ...filters,
            pageNumber: params - 1,
        });
    }

    //Hi???n table v?? ???n form
    function isShowTable(params) {
        setIsDisplay(false);
        setData({
            ...dataDefault,
        });
    }
    //Hi???n form v?? ???n table
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

    //M??? confirm x??a
    function deleteUser(e, value) {
        setOpenConFirm(true);
    }

    //X??a danh m???c
    function yesDeleteUser(params) {
        callApi(`admin/users/delete/${data.id}`, "GET", null, null, {
            Authorization: `Bearer ${token}`,
        })
            .then((response) => {
                const { data } = response;
                if (response.status == 200) {
                    showNoti("X??a th??nh c??ng", "success")
                    setFilters({
                        ...filters,
                    });
                } else {
                    showNoti("X??a th???t b???i", "error")
                }
            })
            .catch((error) => {
                showNoti("X??a th???t b???i", "error")
            });
        setOpenConFirm(false);
    }

    //M??? form danh m???c
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

    //C???p nh???t or th??m danh m???c
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
                showNoti("L??u th??nh c??ng", "success")
            } else {
                showNoti("L??u th???t b???i", "error")
            }
        }).catch((error) => {
            showNoti("L??u th???t b???i", "error")
        });
    }


    //S???p x???p theo c??c tr?????ng
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
            <h3 className="text-center mt-3 mb-3">Qu???n l?? t??i kho???n</h3>
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
                        B???n c?? ch???c ch???n mu???n x??a User n??y kh??ng ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button id="noDelete" onClick={handleClose} color="primary">
                        Kh??ng
                    </Button>
                    <Button onClick={yesDeleteUser} color="primary" autoFocus>
                        C??
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default User;
