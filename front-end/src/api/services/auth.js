import axiosClient from "../axios";

export function signInApi(user) {
  return axiosClient.post("/auth/login", user);
}

export function signUpApi(user) {
  return axiosClient.post("/auth/signup", user);
}

export function getMeApi() {
  return axiosClient.get("/auth/me");
}
