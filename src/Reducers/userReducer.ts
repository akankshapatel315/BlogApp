import { getUserDetails } from "../Actions/userActions";

const initialState = { userData: "" };

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case getUserDetails:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};

export default userReducer;
