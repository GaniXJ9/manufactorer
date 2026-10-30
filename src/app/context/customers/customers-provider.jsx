import { useCallback, useRef, useState } from "react";
import { approveCustomerRequest, attachCustomer, detachCustomer, getCustomerRequests, getCustomers, rejectCustomerRequest } from "../../../shared/api/customers";
import { CustomersContext } from "./customers-context";

export const CustomersProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [requests, setRequests] = useState([]);
  const [requestsLoading, setRequestsLoading] = useState(true);
  const [requestsError, setRequestsError] = useState("");
  const requestsVersion = useRef(0);
  const customersVersion = useRef(0);

  const fetchCustomers = useCallback(async (q = "", signal) => {
    const version = ++customersVersion.current;
    setLoading(true);
    setError("");

    try {
      const { data } = await getCustomers(q, signal);
      if (signal?.aborted || version !== customersVersion.current) return;

      setCustomers(data.items);
    } catch (error) {
      if (signal?.aborted || version !== customersVersion.current) return;

      setCustomers([]);
      setError(
        error.response?.data?.message || "errors.customers",
      );
    } finally {
      if (!signal?.aborted && version === customersVersion.current) setLoading(false);
    }
  }, []);

  const fetchRequests = useCallback(async (signal) => {
    const version = ++requestsVersion.current;
    setRequestsLoading(true);
    setRequestsError("");
    try {
      const { data } = await getCustomerRequests(signal);
      if (signal?.aborted || version !== requestsVersion.current) return;
      setRequests(data.items);
    } catch (error) {
      if (signal?.aborted || version !== requestsVersion.current) return;
      setRequestsError(error.response?.data?.message || "errors.requests");
    } finally {
      if (!signal?.aborted && version === requestsVersion.current) setRequestsLoading(false);
    }
  }, []);

  const attach = async (customer) => {
    const id = customer.id || customer._id;
    await attachCustomer(id);
    await fetchRequests();
  };

  const detach = async (customer) => {
    const id = customer.id || customer._id;
    await detachCustomer(id);
    setCustomers((current) => current.filter((item) => (item.id || item._id) !== id));
    setRequests((current) => current.filter((item) => (item.id || item._id) !== id));
    await Promise.all([fetchCustomers(), fetchRequests()]);
  };

  const approve = async (customer) => {
    await approveCustomerRequest(customer.id || customer._id);
    await Promise.all([fetchCustomers(), fetchRequests()]);
  };

  const reject = async (customer) => {
    await rejectCustomerRequest(customer.id || customer._id);
    await fetchRequests();
  };

  return (
    <CustomersContext.Provider
      value={{ customers, loading, error, fetchCustomers, attach, detach,
        requests, requestsLoading, requestsError, fetchRequests, approve, reject }}
    >
      {children}
    </CustomersContext.Provider>
  );
};
