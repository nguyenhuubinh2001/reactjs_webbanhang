import React, { useState } from 'react';
import callApi from '../../../callAPI/apiCaller';
import './ProductForm.css'
import isEmpty from 'validator/lib/isEmpty'
import isInt from 'validator/lib/isInt'
import isDate from 'validator/lib/isDate'
import * as Config from '../../../callAPI/Config'
function ProductForm(props) {
    const { data, onChangeInput, onclickBack, submitForm2, categories, onChangeImage, onChangeSelect, imagePreview } = props
    const children = [];
    const arrayData = categories.map((value, index) => (
        children.push(<option value={JSON.stringify(value)} key={index}>{value.name}</option>)
    ))
    const [validation, setValidation] = useState('')
    function validateAll() {
        const msg = {}
        if (isEmpty(data.name)) {
            msg.name = 'Vui lòng nhập tên sản phẩm'
        }
        
        let price = Number(document.getElementById("price").value)
        if(!price || price <=0 || !Number.isInteger(price) ){
            msg.price = 'Vui lòng nhập giá sản phẩm là số nguyên dương'
        }
        if (isEmpty(data.createDate)) {
            msg.createDate = 'Vui lòng nhập ngày tạo'
        }
        if (!isDate(data.createDate)) {
            msg.createDate = 'Nhập ngày theo định dạng "yyyy/mm/dd"'
        }

        setValidation(msg)
        if (Object.keys(msg).length > 0) {
            return false
        }
        return true
    }
    function submitForm(e) {
        e.preventDefault();
        const valid = validateAll()
        if (valid) {
            if (submitForm2) {
                submitForm2(e)
            }
        } else {
            console.log("Validate Form Erros")
        }
    }
    return (
        <div className="container rounded bg-white mt-5">
            <div className="row">
                <div className="col-md-4 border-right">

                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img src={imagePreview != `${Config.API_URL}/images/` ? imagePreview : "https://itcafe.vn/wp-content/uploads/2021/01/anh-gai-xinh-4.jpg"}
                            style={{ width: '220px' }} />
                        <br />
                        <div >
                            <input type="file" accept="image/*" name="file" onChange={(e) => onChangeImage(e)} />
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div onClick={onclickBack} className="d-flex flex-row align-items-center back">
                                <h6>Back to home</h6>
                            </div>
                            <h6 className="text-right">{data.id ? "Update Product" : "Add Product"}</h6>
                        </div>
                        <form>
                            <div className="row mt-2">

                                <div className="col-md-6">
                                    <input
                                        value={data.name}
                                        onChange={onChangeInput}
                                        name="name"
                                        id="name"
                                        type="text"
                                        className="form-control"
                                        placeholder="Tên sản phẩm"
                                        onBlur={validateAll}
                                    />
                                    <p className="m-0" style={{ color: "red", fontSize:"12px" }}>{validation.name}</p>
                                </div>

                                <div className="col-md-6">
                                    <input

                                        value={data.price}
                                        onChange={onChangeInput}
                                        name="price"
                                        id="price"
                                        type="text"
                                        className="form-control"
                                        placeholder={"Giá (VNĐ)"}
                                        onBlur={validateAll}
                                    />
                                    <p className="m-0" style={{ color: "red", fontSize:"12px" }}>{validation.price}</p>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <input
                                        value={data.createDate}
                                        onChange={onChangeInput}
                                        name="createDate"
                                        id="createDate"
                                        type="text"
                                        className="form-control"
                                        placeholder="Ngày tạo"
                                        onBlur={validateAll}
                                    />
                                    <p className="m-0" style={{ color: "red", fontSize:"12px" }}>{validation.createDate}</p>
                                </div>
                                <div className="col-md-6">

                                    <select
                                        onChange={onChangeSelect}
                                        value={JSON.stringify(data.category)}
                                        id="category"
                                        className="form-control"
                                        name="category"
                                    >
                                        {children}
                                    </select>
                                </div>

                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <select
                                        onChange={onChangeInput}
                                        value={data.available}
                                        id="available"
                                        className="form-control"
                                        name="available"
                                    >
                                        <option
                                            value={1}
                                        >
                                            Còn hàng
                                        </option>

                                        <option
                                            value={0}
                                        >
                                            Hết hàng
                                        </option>

                                    </select>
                                </div>

                            </div>
                            <div className="mt-4 text-right">
                                <div align="right">
                                    <button
                                        onClick={submitForm}
                                        className="btn btn-primary profile-button "
                                        type="submit"
                                        name={data.id ? "Update" : "Save"}
                                    >
                                        {data.id ? "Update" : "Save"}
                                    </button>
                                    <button
                                        className="btn btn-primary profileR-button "
                                        type="button"
                                    >
                                        Reset Profile
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductForm;