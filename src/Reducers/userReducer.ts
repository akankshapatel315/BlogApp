const initialState = { userData: null };

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "getUserDetails":
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};

export default userReducer;
