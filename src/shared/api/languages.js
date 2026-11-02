import { api } from "../../app/client";

export const getLanguages = (signal) =>
  api.get("manufacturer/v1/languages", { signal });
