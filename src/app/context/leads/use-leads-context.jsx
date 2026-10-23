import { useContext } from "react";
import { LeadsContext } from "./leads-context";

export const useLeadsContext = () => {
  const context = useContext(LeadsContext);

  if (!context) {
    throw new Error("useLeadsContext должен использоваться внутри LeadsProvider");
  }

  return context;
};
