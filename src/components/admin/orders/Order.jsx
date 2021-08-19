import React, { useState, useEffect, useRef } from 'react';
import callApi from '../../../callAPI/apiCaller';
import PaginationTable from "../PaginationTable";
import OrderTable from './OrderTable';
import { useSnackbar } from 'notistack';
import getCookie from '../../../utils/CookieUtils';
import OrderDetails from './OrderDetails'
function Order(props) {

    const { enqueueSnackbar } = useSnackbar();
    const showNoti = (message, variant) => {
        enqueueSnackbar(message, { variant: variant });
    }

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    const token = getCookie("token");
    const [datas, setDatas] = useState([])


    const [status, setStatus] = useState("")
    const [isDisplay, setIsDisplay] = useState(false);

    const [filters, setFilters] = useState({
        pageNumber: 0,
        pageSize: 5,
        sortDirection: "",
        sortBy: ""
    })

    const trangHienTai = useRef(0)
    const [pagination, setPagination] = useState({
        page: filters.pageNumber + 1,
        limit: filters.pageSize,
        max: 1,
    });

    const dataDefault = {
        id: null,
        address: "",
        createDate: "",
        user: {

        },
        status: "",
        orderDetails: [

        ]

    }
    const [data, setData] = useState(dataDefault);

    useEffect(() => {
        callApi("admin/order/getAllByStatus", 'GET', null,
            {
                pageNumber: filters.pageNumber,
                pageSize: filters.pageSize,
                sortDirection: filters.sortDirection,
                sortBy: filters.sortBy,
                status: status
            },
            {
                Authorization: `Bearer ${token}`,
            }
        ).then((response) => {
            if (response.status == 200) {
                const { data } = response;
                setDatas(data)
            }

            if (response.status == 204) {
                setDatas([

                ])
            }
        }).catch((error) => {
            console.log(error)
        })

        callApi("admin/order/getCount", 'GET', null,
            {
                status: status
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


    }, [filters, status])

    function onChangeFilter(e) {
        const value = e.target.value;
        setStatus(value)
    }

    function onChangeStatus(e) {
        const target = e.target
        const name = target.name
        const value = target.value
        setData({
            ...data,
            [name]: value,
        })
    }

    function onClickRow(value, e) {
        const newValue = { ...value };
        setData({
            ...value,
        })

    }
    function onClickUpdate(e, value) {
        const newValue = { ...value };
        setData(newValue);
        console.log(newValue)
        setOpen(true)

    }
    function updateOrder(e) {
        callApi(`admin/order/update/${data.id}`, 'GET', null,
            {
                status: data.status
            },
            {
                Authorization: `Bearer ${token}`,
            }
        ).then((response) => {
            if (response.status == 200) {
                showNoti("Cập nhật thành công", "success")
                setFilters({
                    ...filters
                })
                setOpen(false)
            }
            else {
                showNoti("Cập nhật thất bại", "error")
                setOpen(false)
            }
        }).catch((error) => {
            showNoti("Cập nhật thất bại", "error")
            setOpen(false)
        })

    }


    function onChangeSearch(e) {
        console.log(e.target.value)

    }

    const elmTaskTable = isDisplay ? "" : <OrderTable
        status={status}
        datas={datas}
        onChangeSelect={onChangeFilter}
        onClickRow={onClickRow}
        onClickUpdate={onClickUpdate}
        onChangeSearch={onChangeSearch}
    />

    function handleOnPageChange(params) {
        trangHienTai.current = params;
        console.log(params)
        setFilters({
            ...filters,
            pageNumber: params - 1
        })

    }
    const elmTaskPagination = isDisplay ? "" : <PaginationTable
        pagination={pagination}
        onPageChange={handleOnPageChange}
    />
    return (
        <div className="container">
            <h3 className="text-center mt-3 mb-5">Quản lý Đơn hàng</h3>
            <hr />
            <div>
                {elmTaskTable}
                <div align="center">{elmTaskPagination}</div>
            </div>
            <OrderDetails
                open={open}
                handleClose={handleClose}
                data={data}
                onChangeStatus={onChangeStatus}
                onClickUpdate={updateOrder}
            />
        </div>
    );
}

export default Order;