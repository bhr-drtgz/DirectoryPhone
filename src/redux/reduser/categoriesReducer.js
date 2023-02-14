 import actionTypes from "../action/actionType"
 
const initialState = {
    pending: false,
    success: false,
    categories: [],
    fail: false, 
    error: ""

}

const categoriesReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.categoryActions.GET_CATEGORİES_START:
            return {
                ...state,
                pending: true
            }
        case actionTypes.categoryActions.GET_CATEGORİES_SUCCESS:
            return {
                ...state,
                pending: false,
                success: true,
                categories: action.payload,
                fail: false
            }
        case actionTypes.categoryActions.GET_CATEGORİES_FAIL:
            return {
                ...state,
                pending: false,
                success: false,
                fail: true,
                error: action.payload
            }
        default:
            return state
    }
}

export default categoriesReducers