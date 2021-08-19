import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import * as Config from '../../callAPI/Config'
import {
    Link
} from "react-router-dom";
import { Button } from '@material-ui/core';
import { ChevronDoubleLeft, } from 'react-bootstrap-icons';
function OrderDetails(props) {
    const { data, onClickShowOrders, onClickDelete } = props;
    function getTotal(datas) {
        let total = 0;
        datas.forEach(element => {
            let price = element.price;
            total += price
        });
        return total
    }
    console.log(data)
    return (
        <div>
            <header className=" mb-3 pb-3">
                <div className="form-inline">
                    <span><h4>Chi tiết đơn hàng: #<b>{data.id}</b></h4></span>
                </div>
            </header>
            <div>
                <div className="row" style={{ marginLeft: '-15px' }}>
                    <div className="col">
                        <h6>ĐỊA CHỈ GIAO HÀNG</h6>
                    </div>
                    <div className="col">
                        <h6>HÌNH THỨC GIAO HÀNG</h6>
                    </div>
                    <div className="col">
                        <h6>HÌNH THỨC THANH TOÁN</h6>
                    </div>
                </div>
                <div className="row" style={{ height: '140px', marginLeft: '-10px' }}>
                    <div className="col" style={{ backgroundColor: 'white', margin: '10px' }}>
                        <p className='mt-3'>{data.address}</p>
                    </div>
                    <div className="col" style={{ backgroundColor: 'white', margin: '10px' }}>
                        <p className='mt-3'>
                            Giao hàng tiết kiệm
                            <br />
                            Giao vào Thứ sáu,30/07
                            <br />
                            Phí vận chuyển: 0đ
                        </p>
                    </div>
                    <div className="col" style={{ backgroundColor: 'white', margin: '10px' }}>
                        <p className='mt-3'>Thanh toán tiền mặt khi nhận hàng</p>
                    </div>
                </div>
            </div>
            <div style={{ backgroundColor: 'white', marginTop: '20px', padding: "20px" }}>
                <Table className="table table-bordered table table-hover ">
                    <TableHead className="thead-light">
                        <TableRow >
                            <TableCell align="center"><b>Sản phẩm</b></TableCell>
                            <TableCell align="center"><b>Tên sản phẩm</b></TableCell>
                            <TableCell align="center" ><b>Giá(VND)</b></TableCell>
                            <TableCell align="center"><b>Số lượng</b></TableCell>
                            <TableCell align="center"><b>Giảm giá</b></TableCell>
                            <TableCell align="center"><b>Tạm tính</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.orderDetails.map((value, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">
                                    <img src={`${Config.API_URL}/images/` + value.product.image}
                                        style={{ width: "80px", height: "auto" }}
                                    />
                                </TableCell>
                                <TableCell align="center">{value.product.name}</TableCell>
                                <TableCell align="center">{new Intl.NumberFormat().format(value.product.price)}đ</TableCell>
                                <TableCell align="center">{value.quantity}</TableCell>
                                <TableCell align="center">0đ</TableCell>
                                <TableCell align="center">{new Intl.NumberFormat().format(value.price)}đ</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
                <div className='row'>
                    <div className='col-9'></div>
                    <div className='col-3'>
                        <div className='row' style={{ textAlign: 'right' }}>
                            <div className='col'>
                                <p><b>Tạm tính</b></p>
                                <p><b>Phí vận chuyển</b></p>
                                <p><b>Tổng cộng</b></p>
                            </div>
                            <div className='col'>
                                <p>{new Intl.NumberFormat().format(getTotal(data.orderDetails))}đ</p>
                                <p>0đ</p>
                                <p>{new Intl.NumberFormat().format(getTotal(data.orderDetails))}đ</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-9'></div>
                    <div className='col-3' style={{ textAlign: 'right' }}>
                        <Button
                            onClick={(e) => onClickDelete(e,data)}
                            style={{ backgroundColor: "rgb(253, 216, 53)", color: "black", textTransform: "capitalize" }}
                            variant="contained"
                            color="secondary"
                        >
                            Hủy đơn hàng
                        </Button>
                    </div>
                </div>
            </div>
            <div className='mt-3'>
                <Link to={(location) => `${location.pathname}`} onClick={onClickShowOrders}><ChevronDoubleLeft />Quay lại đơn hàng của tôi</Link>
            </div>
        </div>
    );
}

export default OrderDetails;