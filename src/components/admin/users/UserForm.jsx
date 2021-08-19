import React, { useState } from 'react';
import callApi from '../../../callAPI/apiCaller';
import './UserForm.css'
import getRoles from "../../../utils/getRoles";
function UserForm(props) {
    const { data, onChangeInput, onclickBack, submitForm2 } = props

    const [imagePreview, setImagePreview] = useState("https://itcafe.vn/wp-content/uploads/2021/01/anh-gai-xinh-4.jpg")
    function submitForm(e) {
        e.preventDefault();
        if (submitForm2) {
            submitForm2(e)
        }
    }
    return (
        <div className="container rounded bg-white mt-5">
            <div className="row">
                <div className="col-md-4 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img className="rounded-circle " src={imagePreview} width={220} />
                        <br />
                        {/* <div >
                            <input type="file" name="file" onChange={(e) => onChange(e)} />
                        </div> */}
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div onClick={onclickBack} className="d-flex flex-row align-items-center back">
                                <h6>Back to home</h6>
                            </div>
                            <h6 className="text-right">{data.id ? "Update Customer" : "Add Customer"}</h6>
                        </div>
                        <form>
                            <div className="row mt-2">
                                <div className="col-md-6">
                                    <input
                                        value={data.username}
                                        onChange={onChangeInput}
                                        name="username"
                                        id="username"
                                        type="text"
                                        className="form-control"
                                        placeholder="User name"
                                        readOnly={data.id != ""}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        onChange={onChangeInput}
                                        value={data.fullname}
                                        name="fullname"
                                        id="fullname"
                                        type="text"
                                        className="form-control"
                                        placeholder="Full name"
                                    />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <input
                                        value={data.email}
                                        onChange={onChangeInput}
                                        name="email"
                                        id="email"
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        onChange={onChangeInput}
                                        type="text"
                                        className="form-control"
                                        placeholder="Phone number"
                                        value="0978940546"
                                    />
                                </div>
                            </div>  
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <input
                                        value={data.password}
                                        onChange={onChangeInput}
                                        name="password"
                                        id="password"
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        onChange={onChangeInput}
                                        value={data.passwordConfirm}
                                        name="passwordConfirm"
                                        id="passwordConfirm"
                                        type="password"
                                        className="form-control"
                                        placeholder="Re Password"
                                    />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <select
                                        onChange={onChangeInput}
                                        value={data.roles}
                                        id="roles"
                                        className="form-control"
                                        name="roles"
                                    >
                                        <option
                                            value={"Admin"}
                                        >
                                            Admin
                                        </option>

                                        <option
                                            value={"User"}
                                        >
                                            User
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

export default UserForm;