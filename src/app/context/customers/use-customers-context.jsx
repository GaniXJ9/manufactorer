import { useContext } from "react";
import { CustomersContext } from "./customers-context";

export const useCustomersContext = () => {
  const context = useContext(CustomersContext);

  if (!context) {
    throw new Error("useCustomersContext должен использоваться внутри CustomersProvider");
  }

  return context;
};
