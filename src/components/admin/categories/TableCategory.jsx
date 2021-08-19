import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { PlusCircleFill, TrashFill, Pencil } from 'react-bootstrap-icons';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch, useSelector } from 'react-redux';
import { actClickRowCategory, actShowForm, actSortByTitle, deleteCategory, loadCategories, loadCategoryByPage } from '../actions/category'
import { useSnackbar } from 'notistack';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },

}));
function TableCategory(props) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const showNotication = (message, variant) => {
        enqueueSnackbar(message, { variant: variant });
    }

    const [openConFirm, setOpenConFirm] = React.useState(false);
    const handleClose = () => {
        setOpenConFirm(false);
    };

    const dispatch = useDispatch();

    const data = useSelector(state => state.category.data)
    const showNoti = useSelector(state => state.category.showNoti)
    const filters = useSelector(state => state.category.filters)
    const datas = useSelector(state => state.category.datas)

    useEffect(() => {
        dispatch(loadCategoryByPage(filters))
        dispatch(loadCategories())
    }, [filters]);

    useEffect(() => {
        if (showNoti.variant != '')
            showNotication(showNoti.message, showNoti.variant)
    }, [showNoti]);

    function onClickDelete(params) {
        setOpenConFirm(true);
    }
    function yesDeleteCategory() {
        dispatch(deleteCategory(data.id))
        setOpenConFirm(false);
    }

    function onClickRow(value) {
        const newValue = { ...value };
        dispatch(actClickRowCategory(newValue))
    }

    function onClickSortByTitle(e) {
        const name = e.target.getAttribute('name')
        if (e.target.className == "fas fa-sort-alpha-down ml-3") {
            dispatch(actSortByTitle(name, "DESC"))
            e.target.className = "fas fa-sort-alpha-up ml-3"
        } else if (e.target.className == "fas fa-sort-alpha-up ml-3") {
            dispatch(actSortByTitle(name, "ASC"))
            e.target.className = "fas fa-sort-alpha-down ml-3 df"
        } else {
            dispatch(actSortByTitle("", ""))
            e.target.className = "fas fa-sort-alpha-down ml-3"
        }
    }

    function onClickAdd(params) {
        dispatch(actShowForm())
    }

    function onClickUpdate() {
        dispatch(actShowForm())
    }

    if (datas.length == 0) {
        datas.push({
            id: 0,
            name: "Không có"
        })
    }
    return (
        <div className="container">
            <Button
                onClick={onClickAdd}
                className="mb-3"
                variant="outlined"
                color="primary"
                style={{
                    textTransform: "capitalize"
                }}
            >
                <PlusCircleFill className="mr-1 " size={16} />
                Thêm mới
            </Button>
            <div className="row mb-3">
                <div className="col-6">
                    <input
                        style={{ width: "400px" }}
                        className="form-control"
                        placeholder="Nhập từ khóa tìm kiếm..."
                    />
                </div>
            </div>
            <Table className="table table-bordered table table-hover ">
                <TableHead className="thead-light">
                    <TableRow >
                        <TableCell align="center"><b>Mã danh mục</b><i name="id" onClick={(e) => onClickSortByTitle(e)} className="fas fa-sort-alpha-down ml-3" /></TableCell>
                        <TableCell align="center" ><b>Tên danh mục</b><i name="name" onClick={(e) => onClickSortByTitle(e)} className="fas fa-sort-alpha-down ml-3" /></TableCell>
                        <TableCell align="center"><b>Hành động</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        datas.map((value, index) => (
                            <TableRow onClick={() => { onClickRow(value) }} key={index} >
                                <TableCell align="center">{value.id}</TableCell>
                                <TableCell align="center">{value.name}</TableCell>
                                <TableCell align="center" >
                                    <Button
                                        onClick={(e) => onClickDelete(e, value)}
                                        color="secondary"
                                    >
                                        <TrashFill size={20} className="mr-2" />
                                    </Button>
                                    <Button
                                        onClick={(e) => onClickUpdate(e, value)}
                                        color="primary"
                                    >
                                        <Pencil size={20} className="mr-2" />
                                    </Button>

                                </TableCell>
                            </TableRow>
                        )
                        )
                    }
                </TableBody>
            </Table>
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
                        Bạn có chắc chắn muốn xóa Category này không ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button id="noDelete" onClick={handleClose} color="primary">
                        Không
                    </Button>
                    <Button onClick={yesDeleteCategory} color="primary" autoFocus>
                        Có
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default TableCategory;