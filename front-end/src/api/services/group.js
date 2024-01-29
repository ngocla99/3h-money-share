import axiosClient from "../axios";

export async function getGroupsApi() {
  const response = await axiosClient.get("/users/group");
  return response.data;
}

export function createGroupApi(user) {
  return axiosClient.post("/users/group", user);
}
