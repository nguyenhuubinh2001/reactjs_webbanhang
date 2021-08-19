import React, { useState } from 'react';
import './CategoryForm.css'
import isEmpty from 'validator/lib/isEmpty'
import { useDispatch, useSelector } from 'react-redux';
import { actChangeInput, actShowForm, actShowTable, saveCategory } from '../actions/category';
function CategoryForm(props) {
    const dispatch = useDispatch();
    const data =  useSelector(state => state.category.data)

    function onclickBack() {
        dispatch(actShowTable())
    }

    function submitForm(e) {
        e.preventDefault();
        const valid = validateAll()
        if (valid) {
            console.log("save");
            dispatch(saveCategory(data))
            dispatch(actShowTable())
        } else {
            console.log("Validate Form Erros")
        }
    }

    function onChangeInput(e) {
        dispatch(actChangeInput(e));
    }

    const [validation, setValidation] = useState('')
    function validateAll() {
        const msg = {}
        if (isEmpty(data.name)) {
            msg.name = 'Vui lòng nhập name'
        }
        setValidation(msg)
        if (Object.keys(msg).length > 0) {
            return false
        }
        return true
    }
    return (
        <div className="container rounded bg-white mt-5">
            <div className="row">
                <div className="col-md-4 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img className="rounded-circle " src="https://itcafe.vn/wp-content/uploads/2021/01/anh-gai-xinh-4.jpg" width={220} />
                        <br />
                        
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div onClick={onclickBack} className="d-flex flex-row align-items-center back">
                                <h6>Back to home</h6>
                            </div>
                            <h6 className="text-right">{data.id ? "Update Category" : "Add Category"}</h6>
                        </div>
                        <form>
                            <div className="row mt-2">
                                <div className="col-md-12">
                                    <input
                                        value={data.name}
                                        onChange={onChangeInput}
                                        name="name"
                                        id="name"
                                        type="text"
                                        className="form-control"
                                        placeholder="Name"
                                        onBlur={validateAll}
                                    />
                                    <p className="m-0" style={{ color: "red", fontSize: "12px" }}>{validation.name}</p>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <textarea
                                        value={data.description}
                                        onChange={onChangeInput}
                                        name="description"
                                        id="description"
                                        type="text"
                                        className="form-control"
                                        placeholder="Description"
                                        
                                    />
                                </div>
                            </div>
                            <div className="mt-4 text-right">
                                <div align="right">
                                    <button
                                        onClick={submitForm}
                                        className="btn btn-primary profile-button "
                                        type="submit"

                                    >
                                        Save
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

export default CategoryForm;