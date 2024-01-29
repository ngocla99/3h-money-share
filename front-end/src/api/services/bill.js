import axiosClient from "../axios";

export function getBillsApi() {
  return axiosClient.get("/bills");
}

export function createBillApi(user) {
  return axiosClient.post("/bills", user);
}

export function deletesBillApi(bills) {
  return axiosClient.post("/bills/delete", bills);
}

export function deleteBillApi(id) {
  return axiosClient.delete(`/bills/${id}`);
}
