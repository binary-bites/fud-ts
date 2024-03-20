//local
export const BASE_URL : string = `http://localhost:4000/api`;


export const Endpoints = {
  base: BASE_URL,
  createPost: `${BASE_URL}/post/create?`,
  getPosts: `${BASE_URL}/userActivity/getPosts`,
  login: `${BASE_URL}/user/login`,
  signup: `${BASE_URL}/user/signup`,
  check: `${BASE_URL}/user/check`,
};