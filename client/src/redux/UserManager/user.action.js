import axios from "axios";
import { backend_url } from '../../Pages/BackendURL';
import { USER_ERROR, USER_LOADING, USER_SUCCESS } from "./user.type";

export const getUsers = () => async (dispatch) => {
    dispatch({ type: USER_LOADING });
    try {
        let res = await axios.get(`${backend_url}/users`);
        dispatch({ type: USER_SUCCESS, payload: res.data });
    } catch (e) {
        dispatch({ type: USER_ERROR, payload: e.message });
    }
};

