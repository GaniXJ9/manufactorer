import { api } from "../../app/client";
export const getNotificationsTokenApi = async () => {
  const response = await api.get("/notif/v1/token");
  return response.data;
};
export const getNotificationsApi = async (params, signal) => {
  const response = await api.get("/manufacturer/v1/notifications", { params, signal });
  return response.data;
};
export const getNotificationDetailsApi = async (id, signal) => {
  const response = await api.get(`/manufacturer/v1/notifications/${encodeURIComponent(id)}`, { signal });
  return response.data;
};
export const markAllAsReadApi = async () => {
  await api.post("/manufacturer/v1/notifications/read-all");
};
