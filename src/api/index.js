import axios from "axios";

const URL = "https://code-memories.herokuapp.com/posts";
export const fetchPosts = async () => await axios.get(URL);
export const createPost = async (newPost) => await axios.post(URL, newPost);
export const updatePost = async (postId, updatedPost) =>
  await axios.patch(`${URL}/${postId}`, updatedPost);

export const deletePost = async (postId) =>
  await axios.delete(`${URL}/${postId}`);

export const likePost = async (post) =>
  await axios.patch(`${URL}/${post}/likePost`);
