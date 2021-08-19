import * as types from "../constants/CategoryActionTypes";
import * as actionType from "../constants/ActionTypes";

const dataDefault = {
    id: "",
    name: "",
    description: "",
};

const initialState = {
    datas : [],
    data: dataDefault,
    filters : {
        pageNumber: 0,
        pageSize: 5,
        sortDirection: "",
        sortBy: "",
    },
    pagination : {
        page: 1,
        limit: 5,
        max: 1,
    },
    showNoti: {
        message: '',
        variant: ''
    },
    isDisplay: false
}

const category = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_CATEGORY_BY_PAGE:
            return {
                ...state,
                datas: action.datas
            }
        case types.FETCH_CATEGORIES:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    page: state.filters.pageNumber + 1,
                    max: action.datas.length,
                }
            }
            case actionType.CHANGE_PAGE:
                return {
                    ...state,
                    filters : {
                        ...state.filters,
                        pageNumber: action.tranghientai - 1,
                    }
                }
            case types.DELETE_CATEGORY:
                return {
                    ...state,
                    filters : {
                        ...state.filters,
                    }
                }
            case types.DELETE_CATEGORY_SUCCESS:
                return {
                    ...state,
                    showNoti: {
                        message: "Xóa thành công",
                        variant: "success"
                    }
                }
            case types.DELETE_CATEGORY_ERROR:
                return {
                    ...state,
                    showNoti: {
                        message: "Xóa thất bại",
                        variant: "error"
                    }
                }
            case types.SET_CATEGORY:
                return {
                    ...state,
                    data: action.data
                }
            case actionType.SORT_BY_TITLE:
                return {
                    ...state,
                    filters : {
                        ...state.filters,
                        sortBy: action.title,
                        sortDirection : action.direction
                    }
                }
            case types.ADD_AND_UPDATE_CATEGORY:
                return {
                    ...state,
                    filters : {
                        ...state.filters,
                    },
                    showNoti: {
                        message: "Lưu thành công",
                        variant: "success"
                    }
                }
            case types.ADD_AND_UPDATE_CATEGORY_ERROR:
                return {
                    ...state,
                    showNoti: {
                        message: "Lưu thất bại",
                        variant: "error"
                    }
                }
            case actionType.SHOW_NOFICATION:
                return {
                    ...state,
                    showNoti: {
                        ...state.showNoti
                    }
                }
                case actionType.CHANGE_INPUT:
                    const target = action.e.target;
                    const name = target.name
                    const value = target.value
                    return {
                        ...state,
                        data: {
                            ...state.data,
                            [name]: value,
                        }
                    }
                case actionType.SHOW_TABLE:
                    return {
                        ...state,
                        isDisplay: false,
                        data: dataDefault
                    }
                case actionType.SHOW_FORM:
                    return {
                        ...state,
                        isDisplay: true,
                        data: dataDefault
                    }
            default:
                return state;
    }
}

export default category;