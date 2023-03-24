import { ADD_TASK, REMOVE_TASK, TASK_ERROR, TASK_LOADING, TASK_SUCCESS, UPDATE_TASK } from "./task.type";

const initialState = {
    tasks: [],
    error: false,
    loading: false
};
export const TaskReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_TASK: {
            return {
                ...state,
                loading: false,
                tasks: [...state.tasks, payload]
            }
        }
        case TASK_LOADING: {
            return {
                ...state,
                loading: true,
            }
        }
        case TASK_ERROR: {
            return {
                ...state,
                loading: false,
                error: payload || true
            }
        }
        case TASK_SUCCESS: {
            return {
                ...state,
                loading: false,
                tasks: payload
            }
        }
        case UPDATE_TASK: {
            const updatedTasks = state.tasks.map((ele) => {
                if (ele._id === payload._id) {
                    return {
                        ...ele,
                        ...payload
                    }
                }
                return ele;
            })
            return {
                ...state,
                loading: false,
                tasks: updatedTasks
            }
        }
        case REMOVE_TASK: {
            let filteredTasks = state.tasks.filter(
                (ele) => ele._id !== payload
            )
            return {
                ...state,
                loading: false,
                tasks: filteredTasks
            }
        }
        default: {
            return state;
        }
    }
}