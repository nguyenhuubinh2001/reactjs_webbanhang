import React, { useState, useEffect, useRef } from "react";
import callApi from "../../../callAPI/apiCaller";
import getCookie from "../../../utils/CookieUtils";

function Category(props) {
    const {onClickCategory} = props;
    const token = getCookie("token");
    const [datas, setDatas] = useState([]);
    
    useEffect(() => {
        callApi("admin/categories/getAll", "GET", null, null, {
            Authorization: `Bearer ${token}`,
        })
            .then((response) => {
                const { data } = response;
                setDatas(data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div className="sidebar-widget mb-45">
            <h3 className="sidebar-title">Categories</h3>
            <div className="sidebar-categories">
                <ul>
                    {
                        datas.map((value, index) => (
                            <li key={index} onClick={(e) => onClickCategory(e,value)}><a href="javascript:void(0)" style={{cursor:'pointer'}}>{value.name}</a></li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default Category;