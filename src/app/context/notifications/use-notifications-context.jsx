import { useContext } from "react";
import { NotificationsContext } from "./notifications-context";

export const useNotificationsContext = () => {
  const context = useContext(NotificationsContext);

  if (!context) {
    throw new Error(
      "NotificationsContext должен использоваться внутри NotificationsProvider",
    );
  }

  return context;
};
