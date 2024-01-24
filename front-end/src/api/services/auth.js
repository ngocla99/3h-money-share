import axiosClient from "../axios";

export async function signInApi(user) {
  return await axiosClient.post("/auth/login", user);
}

export async function signUpApi(user) {
  return await axiosClient.post("/auth/signup", user);
}

export async function signOutApi(user) {}
