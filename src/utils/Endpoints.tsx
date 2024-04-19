import { get } from "mongoose";

//local
export const BASE_URL : string = `http://localhost:4000/api`;


export const Endpoints = {
  base: BASE_URL,
  createPost: `${BASE_URL}/post/create?`,
  getPosts: `${BASE_URL}/userActivity/getPosts`,
  getPost: `${BASE_URL}/post/get?`,
  getPostsLoggedOut: `${BASE_URL}/loggedOut/getPosts`,
  login: `${BASE_URL}/user/login`,
  signup: `${BASE_URL}/user/signup`,
  check: `${BASE_URL}/user/check`,
  getUserProfile: `${BASE_URL}/profile/get?`,
  getProfilePosts: `${BASE_URL}/profile/posts?`,
  editProfile: `${BASE_URL}/profile/edit`,
  createComment: `${BASE_URL}/comment/create`,
  getComments: `${BASE_URL}/comment/get?`,
  likePost: `${BASE_URL}/post/like`,
  dislikePost: `${BASE_URL}/post/dislike`,
};
