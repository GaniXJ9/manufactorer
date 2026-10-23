import { api } from "../../app/client";

let profileSnapshot = null;
let requestVersion = 0;
const listeners = new Set();

export const getProfileSnapshot = () => profileSnapshot;
export const subscribeProfile = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const getProfile = async (signal) => {
  const version = ++requestVersion;
  const response = await api.get("manufacturer/profile/v1/get", { signal });
  if (!signal?.aborted && version === requestVersion) {
    profileSnapshot = response.data;
    listeners.forEach((listener) => listener());
  }
  return response;
};

export const updateProfile = (profile, signal) =>
  api.post("manufacturer/profile/v1/update", profile, { signal });

export const uploadAvatar = (file, signal) => {
  const data = new FormData();
  data.append("file", file);
  return api.post("manufacturer/profile/v1/avatar/upload", data, { signal });
};

export const deleteAvatar = (signal) =>
  api.delete("manufacturer/profile/v1/avatar", { signal });
