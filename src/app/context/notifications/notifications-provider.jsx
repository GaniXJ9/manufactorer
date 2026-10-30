import { useCallback, useMemo, useRef, useState } from "react";
import { NotificationsContext } from "./notifications-context";
import {
  getNotificationsApi,
  getNotificationDetailsApi,
  markAllAsReadApi,
} from "../../../shared/api/notifications";

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState(null);
  const [notificationDetails, setNotificationDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotificationDetailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [detailsError, setDetailsError] = useState(null);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const shownIds = useRef(new Set());
  const listRequest = useRef(0);
  const detailsRequest = useRef(0);

  const getNotifications = useCallback(
    async (params, { showSnackbar = false } = {}) => {
      const request = ++listRequest.current;
      setIsLoading(true);
      setError(null);
      try {
        const response = await getNotificationsApi(params);
        if (request !== listRequest.current) return;
        const data = response.data ?? response;
        const items = Array.isArray(data) ? data : (data.results ?? []);
        setNotifications(items);
        setTotal(Number(data.total ?? data.count ?? items.length));
        setPerPage(Number(data.per_page) || 10);
        const newest = items[0];
        if (
          showSnackbar &&
          newest &&
          newest.is_viewed === false &&
          !shownIds.current.has(newest.id)
        ) {
          shownIds.current.add(newest.id);
          setNewNotification(newest);
        }
      } catch (e) {
        if (request === listRequest.current) setError(e.message);
      } finally {
        if (request === listRequest.current) setIsLoading(false);
      }
    },
    [],
  );

  const getNotificationDetails = useCallback(async (id, signal) => {
    const request = ++detailsRequest.current;
    setDetailsLoading(true);
    setDetailsError(null);
    setNotificationDetails(null);
    try {
      const response = await getNotificationDetailsApi(id, signal);
      if (!signal?.aborted && request === detailsRequest.current)
        setNotificationDetails(response.data ?? response);
    } catch (e) {
      if (!signal?.aborted && request === detailsRequest.current)
        setDetailsError(e.message);
    } finally {
      if (!signal?.aborted && request === detailsRequest.current)
        setDetailsLoading(false);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await markAllAsReadApi();
      setNotifications((items) =>
        items.map((item) => ({ ...item, is_viewed: true })),
      );
      return true;
    } catch (e) {
      setError(e.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);
  const clearNewNotificationValue = useCallback(
    () => setNewNotification(null),
    [],
  );
  const value = useMemo(
    () => ({
      notifications,
      newNotification,
      notificationDetails,
      isLoading,
      isNotificationDetailsLoading,
      error,
      detailsError,
      total,
      perPage,
      getNotifications,
      getNotificationDetails,
      markAllAsRead,
      clearNewNotificationValue,
    }),
    [
      notifications,
      newNotification,
      notificationDetails,
      isLoading,
      isNotificationDetailsLoading,
      error,
      detailsError,
      total,
      perPage,
      getNotifications,
      getNotificationDetails,
      markAllAsRead,
      clearNewNotificationValue,
    ],
  );
  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};
