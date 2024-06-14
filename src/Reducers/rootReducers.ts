import { combineReducers } from "redux";
import userReducer from "./userReducer";
const rootReducer: any = combineReducers({
  userData: userReducer,
});

export default rootReducer;
