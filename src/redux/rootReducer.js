import { combineReducers } from "redux";
import dataReducer from './reducers'

const rootReducer = combineReducers({
    data:dataReducer,
});

export default rootReducer;