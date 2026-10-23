import { useCallback, useState } from "react";
import { getLead, getLeads } from "../../../shared/api/leads";
import { LeadsContext } from "./leads-context";

export const LeadsProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, per_page: 10, count: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lead, setLead] = useState(null);
  const [leadLoading, setLeadLoading] = useState(true);
  const [leadError, setLeadError] = useState("");

  const fetchLeads = useCallback(async (params = {}, signal) => {
    setLoading(true);
    setError("");

    try {
      const { data } = await getLeads(params, signal);
      if (signal?.aborted) return;

      setLeads(data.results);
      setPagination({ page: data.page, per_page: data.per_page, count: data.count });
    } catch (error) {
      if (signal?.aborted) return;

      setLeads([]);
      setError(error.response?.data?.message || "Не удалось загрузить перевозки");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  const fetchLead = useCallback(async (id, signal) => {
    setLeadLoading(true);
    setLeadError("");
    setLead(null);

    try {
      const { data } = await getLead(id, signal);
      if (signal?.aborted) return;

      setLead(data);
    } catch (error) {
      if (signal?.aborted) return;

      setLeadError(error.response?.data?.message || "Не удалось загрузить перевозку");
    } finally {
      if (!signal?.aborted) setLeadLoading(false);
    }
  }, []);

  return (
    <LeadsContext.Provider
      value={{
        leads, pagination, loading, error, fetchLeads,
        lead, leadLoading, leadError, fetchLead,
      }}
    >
      {children}
    </LeadsContext.Provider>
  );
};
