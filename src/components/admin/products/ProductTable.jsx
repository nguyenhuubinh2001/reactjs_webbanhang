import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { PlusCircleFill, TrashFill, Pencil } from 'react-bootstrap-icons';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import getRoles from "../../../utils/getRoles";
import { format } from 'date-fns';
import * as Config from '../../../callAPI/Config'
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },

}));
function ProductTable(props) {
    const classes = useStyles();
    const { datas, onClickRow, onClickDelete, onClickUpdate, onClickAdd, onClickSortByName, categories, onChangeSelect, search, onChangeSearch } = props
    const children = [];
    children.push(<option key={0} value={"null"}>Tất cả</option>)
    const arrayData = categories.map((value, index) => (
        children.push(<option value={JSON.stringify(value)} key={index + 1}>{value.name}</option>)
    ))
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND',
    })

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
                <div className="col-9">
                    <input
                        style={{ width: "400px" }}
                        className="form-control"
                        placeholder="Nhập từ khóa tìm kiếm..."
                        value={search}
                        onChange={onChangeSearch}
                    />
                </div>
                <div className="col-3">
                    <select
                        onChange={onChangeSelect}
                        value={categories.id}
                        id="category"
                        className="form-control"
                    >
                        {children}
                    </select>
                </div>
            </div>
            <Table className="table table-bordered table table-hover ">
                <TableHead className="thead-light">
                    <TableRow >
                        <TableCell align="center"><b>Sản phẩm</b></TableCell>
                        <TableCell align="center"><b>Tên sản phẩm</b><i name="name" onClick={(e) => onClickSortByName(e)} className="fas fa-sort-alpha-down ml-3" /></TableCell>
                        <TableCell align="center" ><b>Giá(VND)</b><i name="price" onClick={(e) => onClickSortByName(e)} className="fas fa-sort-alpha-down ml-3" /></TableCell>
                        <TableCell align="center"><b>Ngày tạo</b><i name="createDate" onClick={(e) => onClickSortByName(e)} className="fas fa-sort-alpha-down ml-3" /></TableCell>
                        <TableCell align="center"><b>Tình trạng</b><i name="available" onClick={(e) => onClickSortByName(e)} className="fas fa-sort-alpha-down ml-3" /></TableCell>
                        <TableCell align="center"><b>Hành động</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        datas.length == 0 ? "" :
                            datas.map((value, index) => (
                                <TableRow onClick={() => { onClickRow(value) }} key={index} >
                                    <TableCell align="center">
                                        <img src={`${Config.API_URL}/images/` + value.image}
                                            style={{ width: "80px", height: "auto" }}
                                        />
                                    </TableCell>
                                    <TableCell align="center">{value.name}</TableCell>
                                    <TableCell align="center">{new Intl.NumberFormat().format(value.price)}</TableCell>
                                    <TableCell align="center">{format(new Date(value.createDate), 'yyyy/MM/dd')}</TableCell>
                                    <TableCell align="center">{value.available == "1" ? 'Còn hàng' : 'Hết hàng'}</TableCell>
                                    <TableCell align="center" className={classes.root}>
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

export default ProductTable;