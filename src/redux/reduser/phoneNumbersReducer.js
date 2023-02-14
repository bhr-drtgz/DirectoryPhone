import actionType from "../action/actionType";

const initialState = {
    pending: false,
    success: false,
    phoneNumber: [],
    fail: false,
    error: ""
}

const phoneNumbersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.phoneNumberActions.GET_PHONENUMBER_START:
            return {
                ...state,
                pending: true
            }
        case actionType.phoneNumberActions.GET_PHONENUMBER_SUCCESS:
            return {
                ...state,
                pending: false,
                success: true,
                fail: false,
                phoneNumber: action.payload
            }
        case actionType.phoneNumberActions.GET_PHONENUMBER_FAIL:
            return {
                ...state,
                pending: false,
                success: false,
                fail: true,
                error: action.payload
            }
        case actionType.phoneNumberActions.DELETE_PHONENUMBER_START:
            return {
                ...state,
                pending: true,
            }
        case actionType.phoneNumberActions.DELETE_PHONENUMBER_SUCCESS:
            let filterPhoneNumber = state.phoneNumber.filter(item => item.id !== action.payload)
            return {
                ...state,
                pending: false,
                success: true,
                fail: false,
                phoneNumber: filterPhoneNumber
            }
        case actionType.phoneNumberActions.DELETE_PHONENUMBER_FAIL:
            return {
                ...state,
                pending: false,
                success: false,
                fail: true,
                error: action.payload
            }
        case actionType.phoneNumberActions.ADD_PHONENUMBER:
            return {
                ...state,
                phoneNumber: [...state.phoneNumber, action.payload]
            }
        case actionType.phoneNumberActions.ADIT_PHONE:
            return {
                ...state,
                phoneNumber: [...state.phoneNumber, action.payload]
            }
        default:
            return state
    }
}

export default phoneNumbersReducer