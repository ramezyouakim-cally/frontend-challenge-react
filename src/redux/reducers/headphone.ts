import { combineReducers } from "redux";

/* eslint-disable @typescript-eslint/no-explicit-any */
const headphoneReducer = (state = {}, action: any) => {
    switch (action.type) {
        case 'GET_ALL_HEADPHONES':
            return {
                ...state,
                headphones: action.payload
            }
        default:
            return state;
    }
};

export default combineReducers({
    headphone: headphoneReducer
});
