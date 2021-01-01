const postReducer = (posts = [], action) => {
  const { payload } = action;
  switch (action.type) {
    case "FETCH_ALL":
      return payload;
    case "CREATE_POST":
      return [...posts, payload];
    case "UPDATE_POST":
      return posts.map((post) => (post._id === payload._id ? payload : post));
    case "DELETE_POST":
      return posts.filter((post) => post._id !== payload);
    case "LIKE_POST":
      return posts.map((post) => (post._id === payload._id ? payload : post));
      case "UNLIKE_POST":
        return posts.map((post) => (post._id === payload._id ? payload : post));
    default:
      return posts;
  }
};

export default postReducer;
