import { combineReducers } from "redux";
import categoryReducer from "./categoryReducers";
import userReducer from "./userReducer";
const rootReducer: any = combineReducers({
  categories: categoryReducer,
  userData: userReducer,
});

export default rootReducer;
