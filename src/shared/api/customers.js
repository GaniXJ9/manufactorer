import { api } from "../../app/client";

export const getCustomers = (q = "", signal) =>
  api.get("manufacturer/v1/customers", {
    params: q.trim() ? { q: q.trim() } : {},
    signal,
  });

export const searchCustomers = (q, signal) =>
  api.get("auth/v1/customers", { params: { q: q.trim() }, signal });

export const attachCustomer = (customerId) =>
  api.post("manufacturer/v1/customers/attach", { customerId });

export const detachCustomer = (customerId) =>
  api.delete(`manufacturer/v1/customers/${encodeURIComponent(customerId)}`);

export const getCustomerRequests = (signal) =>
  api.get("manufacturer/v1/customers/requests", { signal });

export const approveCustomerRequest = (customerId) =>
  api.post(
    `manufacturer/v1/customers/${encodeURIComponent(customerId)}/approve`,
    null,
  );

export const rejectCustomerRequest = (customerId) =>
  api.post(
    `manufacturer/v1/customers/${encodeURIComponent(customerId)}/reject`,
  );
