import { applyMiddleware, combineReducers, compose, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { TaskReducer } from "./TaskManager/task.reducer";
import { userReducer } from "./UserManager/user.reducer";


const rootReducer = combineReducers({
    taskManager: TaskReducer,
    userManager: userReducer
});

const composeEnhancer = Window.__REDUX_DEVTOOL_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));
