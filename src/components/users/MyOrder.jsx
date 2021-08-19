import React, { useState } from 'react';
import MyOrderItem from './MyOrderItem';
import OrderDetails from './OrderDetails';
import Orders from './Orders';
function MyOrder(props) {
    const { datas, data, showOrderDetail, isDisplay, onClickShowOrders, onClickDelete } = props
    

    const elementMyOrder = isDisplay ? "" : <Orders
        datas={datas}
        showOrderDetail={showOrderDetail}
    />

    const elementOrderDetai = isDisplay ? <OrderDetails
        data={data}
        onClickShowOrders = {onClickShowOrders}
        onClickDelete = {onClickDelete}
    /> : ""
    return (
        <div className="container " style={{ marginRight: "80px" }}>
            {datas.length==0? <h3>Chưa có đơn hàng nào, bạn vui lòng đặt hàng</h3> :  elementMyOrder}
            {elementOrderDetai}
        </div>
    );
}

export default MyOrder;