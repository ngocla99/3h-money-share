import axiosClient from "../axios";

export function getGroupsApi() {
  return axiosClient.get("/groups");
}

export function createGroupApi(group) {
  return axiosClient.post("/groups", group);
}
