import * as api from "../../api";

//* Action Creators

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({
      type: "FETCH_ALL",
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({
      type: "CREATE_POST",
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (postId, updatedPost) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(postId, updatedPost);
    console.log(data);
    dispatch({
      type: "UPDATE_POST",
      payload: data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    await api.deletePost(postId);
    dispatch({
      type: "DELETE_POST",
      payload: postId,
    });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (post) => async (dispatch) => {
  try {
    const { data } = await api.likePost(JSON.stringify(post));

    dispatch({ type: "LIKE_POST", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

// export const unlikePost = (id) => async (dispatch) => {
//   try {
//     const { data } = await api.unlikePost(id);

//     dispatch({ type: "UNLIKE_POST", payload: data });
//   } catch (error) {
//     console.log(error.message);
//   }
// };
