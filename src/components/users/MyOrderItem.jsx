import React, { useState } from 'react';
import * as Config from '../../callAPI/Config'
import Button from '@material-ui/core/Button';
import { ChevronDoubleDown, } from 'react-bootstrap-icons';
import { format } from 'date-fns';
import {
    Link
} from "react-router-dom";

function MyOrderItem(props) {
    const { data, showOrderDetail } = props;
    Date.prototype.addDays = function (days) {
        var date = new Date(data.createDate);
        date.setDate(date.getDate() + days);
        return date;
    }

    var date = new Date();

    let statusName = ""
    if (data.status == 0) {
        statusName = "Đang chờ xác nhận"
    } else if (data.status == 25) {
        statusName = "Đã xác nhận"
    } else if (data.status == 50) {
        statusName = "Đang đóng gói"
    } else if (data.status == 70) {
        statusName = "Đang vận chuyển"
    } else {
        statusName = "Giao hàng thành công"
    }

    const dataNew = format(new Date(date.addDays(5)), 'dd/MM/yyyy');
    return (
        <div
            style={{
                padding: '20px',
                border: '0.1px solid #EEEEEE',
                marginBottom: '30px',
                backgroundColor: 'white'
            }}
        >
            <div className="row" style={{ height: "60px" }}>
                <div className="col-5">
                    <div className="row">
                        <div className="col">
                            <p style={{ margin: '0px' }}>Mã đơn hàng</p>
                            {data.id}
                        </div>
                        <div className="col">
                            <p style={{ margin: '0px' }}>Ngày mua</p>
                            {data.createDate}
                        </div>
                        <div className="col">
                            <p style={{ margin: '0px' }}>Tổng tiền</p>
                            200.000đ
                        </div>
                    </div>
                </div>
                <div className="col-3">
                    <p style={{ margin: '0px', marginTop: '-5px' }}>Địa chỉ giao hàng</p>
                    {data.address}
                </div>

            </div>
            <hr />
            <div className="row" style={{ height: "80px", marginLeft: "-1px" }} >
                <div>
                    <h6>
                        Giao vào : {dataNew}
                    </h6>
                </div>
                <div className="progress" style={{ width: "100%", marginRight: '15px' }}>
                    <div className="progress-bar" role="progressbar" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} style={{ width: data.status + "%", backgroundColor:'green' }}>

                    </div>
                </div>
                <div>
                    <h6 className="mt-2">Trạng thái: {statusName}</h6>
                </div>
            </div>
            <div className="row"  >
                <div className="col-8">
                    <div>
                        <div className="card mb-3" style={{ maxWidth: '540px', height: '250px' }}>
                            <div className="row g-0">
                                <div style={{}} className="col">
                                    <img
                                        style={{ height: '220px', marginTop: '10px', width: '200px', marginLeft: '10px' }}
                                        src={`${Config.API_URL}/images/` + data.orderDetails[0].product.image} alt=""
                                    />
                                </div>
                                <div className="col" style={{ marginLeft: '-150px' }}>
                                    <div className="card-body">
                                        <h4 className="card-title">{data.orderDetails[0].product.name}</h4>
                                        <p className="card-text">Số lượng : {data.orderDetails[0].quantity}</p>
                                        <p className="card-text">Tổng: {new Intl.NumberFormat().format(data.orderDetails[0].price)}<sup>đ</sup></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-3">

                </div>
            </div>
            <div className="row" style={{ height: "60px" }}>
                <div className="col">
                    <div className='mt-3 '>
                        <Link to={(location) => `${location.pathname}`} onClick={(e) => showOrderDetail(e, data)}>{data.orderDetails.length > 1 ? `Và ${data.orderDetails.length - 1} sản phẩm khác ` : ""} </Link>

                    </div>
                </div>
                <div className="col" style={{
                    padding: '0px',

                }}>
                    <div align='right' style={{ marginRight: '15px' }}>
                        <Button style={{ backgroundColor: "rgb(253, 216, 53)", color: "black", textTransform: "capitalize" }} className="mr-3" variant="contained" color="secondary">
                            Theo dõi đơn hàng
                        </Button>
                        <Button onClick={(e) => showOrderDetail(e, data)} style={{ backgroundColor: "rgb(253, 216, 53)", color: "black", textTransform: "capitalize" }} variant="contained" color="secondary">
                            Chi tiết đơn hàng
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyOrderItem;