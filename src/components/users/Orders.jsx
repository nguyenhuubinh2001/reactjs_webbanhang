import React from 'react';
import MyOrderItem from './MyOrderItem';

function Orders(props) {
    const {datas, showOrderDetail} = props;
    return (
        <div>
             <header className=" mb-3 pb-3">
                <div className="form-inline">
                    <span><h3>Đơn hàng của tôi</h3></span>
                </div>
            </header>
            {
                datas.map((value, index) => (
                    <MyOrderItem
                        key={index}
                        data={value}
                        showOrderDetail={showOrderDetail}
                    />
                ))
            }
        </div>
    );
}

export default Orders;