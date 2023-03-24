import axios from "axios";
import { backend_url } from '../../Pages/BackendURL';
import { ADD_TASK, REMOVE_TASK, TASK_ERROR, TASK_LOADING, TASK_SUCCESS, UPDATE_TASK } from "./task.type";

export const getTasks = (page) => async (dispatch) => {
    dispatch({ type: TASK_LOADING });
    try {
        let res = await axios.get(`${backend_url}/dashboard/?page=` + page);
        dispatch({ type: TASK_SUCCESS, payload: res.data });
    } catch (e) {
        dispatch({ type: TASK_ERROR, payload: e.message });
    }
};

export const addTask = (message) => async (dispatch) => {
    dispatch({ type: TASK_LOADING });
    try {
        let res = await axios.post(`${backend_url}/dashboard/post`, message);
        dispatch({ type: ADD_TASK, payload: res.data });
    } catch (e) {
        dispatch({ type: TASK_ERROR, payload: e.message });
    }
};
// Note: In post and patch requests always gives object after url of json-server or api url; here message and changes both are objects which comes different-2 files;
export const updateTask = (id, changes) => async (dispatch) => {
    dispatch({ type: TASK_LOADING });
    try {
        let res = await axios.patch(`${backend_url}/dashboard/patch/${id}`, {
            ...changes
        });
        dispatch({ type: UPDATE_TASK, payload: res.data });
    } catch (e) {
        dispatch({ type: TASK_ERROR, payload: e.message });
    }
};

export const deleteTask = (id) => async (dispatch) => {
    dispatch({ type: TASK_LOADING });
    try {
        let res = await axios.delete(`${backend_url}/dashboard/delete/${id}`);
        dispatch({ type: REMOVE_TASK, payload: res.data._id });
    } catch (e) {
        dispatch({ type: TASK_ERROR, payload: e.message });
    }
};