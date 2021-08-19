import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { CheckCircleFill, TrashFill, Pencil } from 'react-bootstrap-icons';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import getRoles from "../../../utils/getRoles";
import { format } from 'date-fns';
import * as Config from '../../../callAPI/Config'
import { data } from 'jquery';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },

}));
function OrderTable(props) {
    const classes = useStyles();
    const { status, datas, onClickSortByName, onChangeSelect, onChangeStatus, onClickRow, onClickUpdate, onChangeSearch } = props

    const statuses = [
        {
            id: 0,
            name: "Chờ xác nhận"
        },
        {
            id: 25,
            name: "Đã xác nhận"
        },
        {
            id: 50,
            name: "Đang đóng gói"
        },
        {
            id: 75,
            name: "Đang vận chuyển"
        },
        {
            id: 100,
            name: "Giao thành công"
        }
    ]
    const children = [];
    const arrayData = statuses.map((value, index) => (
        children.push(<option value={value.id} key={index + 1}>{value.name}</option>)
    ))

    function getTotal(array) {
        let total = 0;
        array.forEach(element => {
            total += element.price;
        });
        return total;
    }

    function getStatus(status) {
        let statusName = ""
        if (status == 0) {
            statusName = "Đang chờ xác nhận"
        } else if (status == 25) {
            statusName = "Đã xác nhận"
        } else if (status == 50) {
            statusName = "Đang đóng gói"
        } else if (status == 70) {
            statusName = "Đang vận chuyển"
        } else {
            statusName = "Giao hàng thành công"
        }
        return statusName;
    }


    return (
        <div className="container">
            <div className="row mb-3">
                <div className="col-9">
                    <input
                        style={{ width: "400px" }}
                        className="form-control"
                        placeholder="Nhập từ khóa tìm kiếm..."
                        onChange={onChangeSearch}
                    />
                </div>
                <div className="col-3">
                    <select
                        onChange={onChangeSelect}
                        id="status"
                        className="form-control"
                        value={status}
                    >
                        <option key={0} value={""}>Tất cả</option>
                        {children}
                    </select>
                </div>
            </div>
            <Table className="table table-bordered table table-hover ">
                <TableHead className="thead-light">
                    <TableRow >
                        <TableCell align="center"><b>Mã đơn hàng</b></TableCell>
                        <TableCell align="center" ><b>Tổng tiền</b><i name="price" onClick={(e) => onClickSortByName(e)} className="fas fa-sort-alpha-down ml-3" /></TableCell>
                        <TableCell align="center"><b>Khách hàng</b><i /></TableCell>
                        <TableCell align="center"><b>Trạng thái</b><i /></TableCell>
                        <TableCell align="center"><b>Ngày tạo</b><i /></TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        datas.map((value, index) => (
                            <TableRow key={index} onClick={(e) => onClickRow(value, e)}>
                                <TableCell align="center">{value.id}</TableCell>
                                <TableCell align="center">{new Intl.NumberFormat().format(getTotal(value.orderDetails))}<sup>đ</sup></TableCell>
                                <TableCell align="center" >{value.user.username}</TableCell>
                                <TableCell align="center" >
                                    {getStatus(value.status)}
                                </TableCell>
                                <TableCell align="center">{value.createDate}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant="outlined"
                                        style={{
                                            textTransform: "capitalize"
                                        }}
                                        color="primary"
                                        onClick={(e) => onClickUpdate(e, value)}
                                    >
                                        <CheckCircleFill className="mr-2"></CheckCircleFill>
                                        Update Order Status
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
}

export default OrderTable;