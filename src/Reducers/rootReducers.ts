import { combineReducers } from "redux";
import userReducer from "./userReducer";
import blogReducer from "./blogReducer";
const rootReducer: any = combineReducers({
  userData: userReducer,
  blogData:blogReducer
});

export default rootReducer;
