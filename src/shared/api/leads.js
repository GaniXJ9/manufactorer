import { api } from "../../app/client";

export const getLeads = (params = {}, signal) =>
  api.get("manufacturer/v1/leads", { params, signal });

export const getLead = (id, signal) =>
  api.get(`manufacturer/v1/leads/${encodeURIComponent(id)}`, { signal });
