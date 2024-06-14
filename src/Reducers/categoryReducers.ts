const initialState = { categories: [] };

const categoryReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_CATEGORY":
      return { ...state, categories: [...state.categories] };
    default:
      return state;
  }
};

export default categoryReducer;
