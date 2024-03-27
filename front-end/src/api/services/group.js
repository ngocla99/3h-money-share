import axiosClient from "../axios";

export function getUserGroupsApi() {
  return axiosClient.get("/groups");
}

export function getGroupApi(id) {
  return axiosClient.get(`/groups/${id}`);
}

export function createGroupApi(group) {
  return axiosClient.post("/groups", group);
}

export function updateGroupApi(id, group) {
  console.log("🚀 ~ updateGroupApi ~ group:", group);
  return axiosClient.patch(`/groups/${id}`, group);
}
