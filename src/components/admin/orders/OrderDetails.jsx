import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as Config from '../../../callAPI/Config'
function OrderDetails(props) {
    const { open, handleClose, data,onChangeStatus, onClickUpdate } = props


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
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Chi tiết đơn hàng</DialogTitle>
            <DialogContent>
                <div className="row" style={{ width: '590px' }}>
                    <div className="col-7 mr-3 mt-1" style={{ borderRight: "solid #EEEEEE 0.1px" }}>
                        <DialogContentText>Mã đơn hàng : {data.id}</DialogContentText>
                        <DialogContentText>Khách hàng : {data.user.fullname}</DialogContentText>
                        <DialogContentText>Tổng tiền : {new Intl.NumberFormat().format(getTotal(data.orderDetails))}<sup>đ</sup></DialogContentText>
                        <DialogContentText>Trạng thái :
                            <select
                                style={{
                                    width: '190px',
                                    height: '35px',
                                    marginRight: '-40px',
                                    marginTop:'10px'
                                }}
                                id="status"
                                name = "status"
                                className="form-control"
                                value={data.status}
                                onChange={(e) => onChangeStatus(e)}
                            >
                                {children}
                            </select>
                        </DialogContentText>
                    </div>
                    <div className="col-4">
                        <div style={{ marginLeft: '-15px' }}>
                            <p>Sản phẩm</p>
                        </div>
                        {data.orderDetails.map((value, index) => (
                            <div className='row mb-3'>
                                <div className="col-4" style={{ padding: '0' }}>
                                    <img
                                        src={`${Config.API_URL}/images/` + value.product.image}
                                        alt=""
                                        style={{ width: '60px', height: '70px', }}
                                    />
                                </div>
                                <div className="col-8" style={{ padding: '0' }}>
                                    <div style={{ marginTop: '-4px' }}>
                                        {value.product.name}
                                    </div>
                                    <div style={{ marginTop: '8px' }}>
                                        Số lượng: {value.quantity}
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </DialogContent>
            <DialogActions className="mr-2 mb-2">
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onClickUpdate} color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default OrderDetails;