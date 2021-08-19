import React, { useState, useEffect, useRef } from 'react';
import callApi from '../../../callAPI/apiCaller';
import PaginationTable from "../PaginationTable";
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import getCookie from "../../../utils/CookieUtils";
import { format } from 'date-fns';
import * as Config from '../../../callAPI/Config'
import { useSnackbar } from 'notistack';
function Product(props) {
    const { enqueueSnackbar } = useSnackbar();
    const showNoti = (message, variant) => {
        enqueueSnackbar(message, { variant: variant });
    }

    const token = getCookie("token");
    const [datas, setDatas] = useState([])

    const [categories, setCategories] = useState([])

    const categoryDefault = {
        id: "",
        name: "",
        description: ""
    }

    const [category, setCategory] = useState(categoryDefault);

    const [isDisplay, setIsDisplay] = useState(false);

    const [filters, setFilters] = useState({
        pageNumber: 0,
        pageSize: 5,
        sortDirection: "",
        sortBy: ""
    })
    const [pagination, setPagination] = useState({
        page: filters.pageNumber + 1,
        limit: filters.pageSize,
        max: 1,
    });

    
    const [openConFirm, setOpenConFirm] = React.useState(false);
    const handleClose = () => {
        setOpenConFirm(false);
    };

    const trangHienTai = useRef(0)

    const dataDefault = {
        id: null,
        name: "",
        image: "",
        price: "",
        createDate: "",
        available: 1,
        category: {

        },
    }
    const [data, setData] = useState(dataDefault);
    const [search, setSearch] = useState("")
    const [imagePreview, setImagePreview] = useState(`${Config.API_URL}/images/`+data.image)
    const [file, setFile] = useState(null);
    useEffect(() => {
        callApi("admin/categories/getAll", 'GET', null, null, {
            Authorization: `Bearer ${token}`,
        }
        ).then((response) => {
            const { data } = response;
            setCategories(data)
        })
    }, [])

    useEffect(() => {
        callApi("admin/products/getAllByCategory", 'GET', null,
            {
                pageNumber: filters.pageNumber,
                pageSize: filters.pageSize,
                sortDirection: filters.sortDirection,
                sortBy: filters.sortBy,
                categoryId: category.id,
                search: search
            },
            {
                Authorization: `Bearer ${token}`,
            }
        ).then((response) => {
            if(response.status == 200){
                const { data } = response;
                setDatas(data)
            }
            
            if(response.status == 204){
                setDatas([
                    
                ])
            }
        }).catch((error) => {
            console.log(error)
        })

        callApi("admin/products/getCount", 'GET', null,
            {
                categoryId: category.id,
                search: search
            },
            {
                Authorization: `Bearer ${token}`,
            }
        ).then((response) => {
            setPagination({
                ...pagination,
                page: filters.pageNumber + 1,
                max: response.data
            })
        }).catch((error) => {
            console.log(error)
        })

    }, [filters])

    //Hiện form và ẩn table
    function isShowForm(params) {
        setIsDisplay(true);
        setData({
            ...dataDefault
        })
        setImagePreview(`${Config.API_URL}/images/`+data.image)
    }

    //Hiện table và ẩn form
    function isShowTable(params) {
        setIsDisplay(false);
        setData({
            ...dataDefault
        })
        setImagePreview(`${Config.API_URL}/images/`+data.image)
    }

    function onClickSortByName(e) {
        const name = e.target.getAttribute('name')
        if (e.target.className == "fas fa-sort-alpha-down ml-3") {
            setFilters({
                ...filters,
                sortDirection: "DESC",
                sortBy: name
            })
            e.target.className = "fas fa-sort-alpha-up ml-3"
        } else if (e.target.className == "fas fa-sort-alpha-up ml-3") {
            setFilters({
                ...filters,
                sortDirection: "ASC",
                sortBy: name
            })
            e.target.className = "fas fa-sort-alpha-down ml-3 df"
        } else {
            setFilters({
                ...filters,
                sortDirection: "",
                sortBy: ""
            })
            e.target.className = "fas fa-sort-alpha-down ml-3"
        }

    }

    function handleOnPageChange(params) {
        trangHienTai.current = params;
        console.log(params)
        setFilters({
            ...filters,
            pageNumber: params - 1
        })

    }

    function onClickRow(value) {
        const newValue = { ...value };
        setData({
            ...value,
            createDate: format(new Date(newValue.createDate), 'yyyy/MM/dd')
        })
        setImagePreview(`${Config.API_URL}/images/`+newValue.image)
    }

    function deleteProduct(params) {
        setOpenConFirm(true)
    }

    function yesDeleteProduct(params) {
        callApi(`admin/products/delete/${data.id}`, "GET", null, null, {
            Authorization: `Bearer ${token}`,
        })
            .then((response) => {
                const { data } = response;
                if (response.status == 200) {
                    showNoti("Xóa thành công","success")
                    setFilters({
                        ...filters,
                    });
                } else {
                    showNoti("Xóa thất bại","error")
                }
            })
            .catch((error) => {
                showNoti("Xóa thất bại","error")
            });
        setOpenConFirm(false);
    }

    function updateProduct(e, value) {
        setIsDisplay(true);
    }

    function saveProduct(params) {
        let formData = new FormData();
        formData.append("file", file);
        if(data.id!==null){
            formData.append("id", data.id)
        }
        formData.append("name", data.name)
        formData.append("price", data.price)
        formData.append("image", data.image)
        formData.append("createDate", new Date(data.createDate))
        formData.append("available", data.available)
        axios({
            method: "post",
            url: "http://localhost:8080/AsmJava6/admin/products/createOrUpdate",
            data: formData,
            params: {
                categoryId: data.category.id
            },
            headers:
            {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                const { data } = response;
                if (response.status == 200) {
                    setIsDisplay(false)
                    setFilters({
                        ...filters
                    })
                    showNoti("Lưu thành công","success")

                } else {
                    showNoti("Lưu thất bại","error")
                }
            })
            .catch((error) => {
                showNoti("Lưu thất bại","error")
            });
    }

    function getAllByCategory(e) {
        const text = e.target.value;
        const obj = JSON.parse(text)
        if (obj == null) {
            setCategory(categoryDefault)
        } else {
            setCategory(obj)
        }
        setFilters({
            ...filters
        })
    }

    function onChangeSearch(e) {
        const value = e.target.value;
        setSearch(value)
        setFilters({
            ...filters
        })
    }

    function onChangeInput(e) {
        const target = e.target
        const name = target.name
        const value = target.value
        setData({
            ...data,
            [name]: value,
        })
    }



    function onChangeSelect(e) {
        const text = e.target.value;
        const obj = JSON.parse(text);
        setData({
            ...data,
            category: obj
        })
    }

    
    function onChangeImage(e) {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            setImagePreview(e.target.result)
        }
        const imageData = new FormData();
        imageData.append('imageFile', file);
        setFile(file)
    }

    console.log()
    const elmTaskTable = isDisplay ? "" : <ProductTable
        datas={datas}
        categories={categories}
        onClickRow={onClickRow}
        onClickDelete={deleteProduct}
        onClickUpdate={updateProduct}
        onClickAdd={isShowForm}
        onClickSortByName={onClickSortByName}
        onChangeSelect={getAllByCategory}
        search={search}
        onChangeSearch = {onChangeSearch}

    />

    const elmTaskForm = isDisplay ? <ProductForm
        data={data}
        categories={categories}
        onChangeInput={onChangeInput}
        submitForm2={saveProduct}
        onclickBack={isShowTable}
        onChangeSelect={onChangeSelect}
        onChangeImage={onChangeImage}
        imagePreview={imagePreview}

    /> : ""

    const elmTaskPagination = isDisplay ? "" : <PaginationTable
        pagination={pagination}
        onPageChange={handleOnPageChange}
    />
    return (
        <div className="container">
            <h3 className="text-center mt-3 mb-3">Quản lý Sản phẩm</h3>
            <hr />
            <div>
                {elmTaskForm}
                {elmTaskTable}
                <div align="center">{elmTaskPagination}</div>
            </div>
            <Dialog
                open={openConFirm}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Confirm Delete Category"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có chắc chắn muốn xóa sản phẩm này không ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button id="noDelete" onClick={handleClose} color="primary">
                        Không
                    </Button>
                    <Button onClick={yesDeleteProduct} color="primary" autoFocus>
                        Có
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Product;