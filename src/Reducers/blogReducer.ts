import { getBlogs } from "../Actions/blogActions";

const initialState = { blogData: [] };

const blogReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case getBlogs:
      return { ...state, blogData: [...state.blogData, ...action.payload] };
    default:
      return state;
  }
};

export default blogReducer;
