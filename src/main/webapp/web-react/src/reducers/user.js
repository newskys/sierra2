import {createAction, handleActions} from "redux-actions";

const SET_USER_INFO = "user/SET_USER_INFO";

const initialState = {
    userId: "",
    token: ""
};

export const setUserInfo = createAction(SET_USER_INFO);

export function getUserInfo(userInfo) {
    dispatch(setUserInfo(userInfo));
}

export default handleActions({
    [SET_USER_INFO]: (state, action) => ({...state, ...action.payload})
}, initialState);
