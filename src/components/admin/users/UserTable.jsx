import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { PlusCircleFill, TrashFill, Pencil } from 'react-bootstrap-icons';
import { TableSortLabel } from '@material-ui/core';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import getRoles from "../../../utils/getRoles";
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },

}));
function UserTable(props) {
    const classes = useStyles();
    const { datas, onClickRow, onClickDelete, onClickUpdate, onClickAdd, onClickSortByName} = props
    if(datas.length==0){
        datas.push({
            id : 0,
            name : "Không có"
        })
    }
    
    return (
        <div className="container">
            <Button
                onClick={onClickAdd}
                className="mb-3"
                variant="outlined" 
                color="primary"
                style={{
                    textTransform: "capitalize"
                }}
            >
                <PlusCircleFill className="mr-1 " size={16} />
                Thêm mới
            </Button>
            <div className="row mb-3">
                <div className="col-6">
                    <input
                        style={{width:"400px"}}
                        className="form-control"
                        placeholder="Nhập từ khóa tìm kiếm..."
                    />
                </div>
            </div>
            <Table className="table table-bordered table table-hover ">
                <TableHead className="thead-light">
                    <TableRow >
                        <TableCell align="center"><b>Tên tài khoản</b><i  name="id" onClick={(e) => onClickSortByName(e)} className="fas fa-sort-alpha-down ml-3" /></TableCell>
                        <TableCell align="center" ><b>Họ tên</b><i name="fullname" onClick={(e) => onClickSortByName(e)} className="fas fa-sort-alpha-down ml-3" /></TableCell>
                        <TableCell align="center"><b>Email</b><i name="email" onClick={(e) => onClickSortByName(e)} className="fas fa-sort-alpha-down ml-3" /></TableCell>
                        <TableCell align="center"><b>Chức vụ</b></TableCell>
                        <TableCell align="center"><b>Hành động</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {   
                        datas.map((value, index) => (
                            <TableRow onClick={() => { onClickRow(value) }} key={index} >
                                <TableCell align="center">{value.username}</TableCell>
                                <TableCell align="center">{value.fullname}</TableCell>
                                <TableCell align="center">{value.email}</TableCell>
                                <TableCell align="center">{getRoles(value.roles)}</TableCell>
                                <TableCell align="center" >
                                    <Button
                                        onClick={(e) => onClickDelete(e, value)}
                                        color="secondary"
                                    >
                                        <TrashFill size={20} className="mr-2" />
                                    </Button>
                                    <Button
                                        onClick={(e) => onClickUpdate(e, value)}
                                        color="primary"
                                    >
                                        <Pencil size={20} className="mr-2" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
                        ) 
                    }
                </TableBody>
            </Table>
        </div>
    );
}

export default UserTable;