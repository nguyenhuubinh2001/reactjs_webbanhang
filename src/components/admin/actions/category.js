import callApi from "../../../callAPI/apiCaller";
import * as types from "../constants/CategoryActionTypes";
import * as actionType from "../constants/ActionTypes";
import getCookie from "../../../utils/CookieUtils";
const token = getCookie("token");

export const loadCategoryByPage = (filters) => {
  return (dispatch) => {
    return callApi(
      `admin/categories/getAllByPage`,
      "GET",
      null,
      {
        pageNumber: filters.pageNumber,
        pageSize: filters.pageSize,
        sortDirection: filters.sortDirection,
        sortBy: filters.sortBy,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    ).then((response) => {
      dispatch(actFetchCategoryByPage(response.data));
    });
  };
};
export const actFetchCategoryByPage = (datas) => {
  return {
    type: types.FETCH_CATEGORY_BY_PAGE,
    datas,
  };
};


export const loadCategories = () => {
  return (dispatch) => {
    return callApi("admin/categories/getAll", "GET", null, null, {
      Authorization: `Bearer ${token}`,
    }).then((response) => {
      dispatch(actFetchCategories(response.data));
    });
  };
};
export const actFetchCategories = (datas) => {
  return {
    type: types.FETCH_CATEGORIES,
    datas,
  };
};


export const actOnPageChange = (tranghientai) => {
  return {
    type: actionType.CHANGE_PAGE,
    tranghientai,
  };
};

export const deleteCategory = (id) => {
  return (dispatch) => {
    return callApi(`admin/categories/delete/${id}`, "GET", null, null, {
      Authorization: `Bearer ${token}`,
    })
      .then((response) => {
        const { data } = response;
        if (response.status == 200) {
          dispatch(actDeleteCategory());
          dispatch(actDeleteCategorySuccess())
        }else {
          dispatch(actDeleteCategoryError());
        }
      })
      .catch((error) => {
        dispatch(actDeleteCategoryError());
      });
  };
};
export const actDeleteCategory = () => {
  return {
    type: types.DELETE_CATEGORY,
  };
};
export const actDeleteCategorySuccess = () => {
  return {
    type: types.DELETE_CATEGORY_SUCCESS,
  };
};

export const actDeleteCategoryError = () => {
  return {
    type: types.DELETE_CATEGORY_ERROR,
  };
};

export const actClickRowCategory = (data) => {
  return {
    type: types.SET_CATEGORY,
    data
  };
};

export const actSortByTitle = (title,direction) => {
  return {
    type: actionType.SORT_BY_TITLE,
    title: title,
    direction: direction
  };
};

export const saveCategory = (category) => {
  console.log("vào")
  return (dispatch) => {
    return callApi(`admin/categories/createOrUpdate`, "POST",{
      id: category.id,
      name: category.name,
      description: category.description
  }, null, {
      Authorization: `Bearer ${token}`,
    })
      .then((response) => {
        if (response.status == 200){
          dispatch(actSaveCategory())
        }else {
          dispatch(actSaveCategoryError())
        }
      })
      .catch((error) => {
         dispatch(actSaveCategoryError())
      });
  };
};

export const actSaveCategory = () => {
  return {
    type: types.ADD_AND_UPDATE_CATEGORY,
  };
};


export const actSaveCategoryError = () => {
  return {
    type: types.ADD_AND_UPDATE_CATEGORY_ERROR,
  };
};

export const actShowNofication = () => {
  return {
    type: actionType.SHOW_NOFICATION
  };
};
export const actChangeInput = (e) => {
  return {
    type: actionType.CHANGE_INPUT,
    e
  };
};

export const actShowTable = () => {
  return {
    type: actionType.SHOW_TABLE,
  };
};
export const actShowForm = () => {
  return {
    type: actionType.SHOW_FORM,
  };
};
