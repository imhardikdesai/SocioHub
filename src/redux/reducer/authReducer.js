import { UPDATE_CHANGES } from "../actionTypes"

const initialState = {
    status: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CHANGES:
            return {
                ...state,
                status: !state.status
            }
        default:
            return { ...state }
    }
}

export default authReducer