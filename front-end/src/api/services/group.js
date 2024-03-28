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

export function updateGroupApi({ id, data }) {
  return axiosClient.patch(`/groups/${id}/`, data);
}

export function deleteUserFromGroupApi({ id, data }) {
  return axiosClient.patch(`/groups/${id}/delete-members`, data);
}
