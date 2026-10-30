import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { Alert, Box, Button, Chip, CircularProgress, Stack, Tab, Tabs, TextField, Typography } from "@mui/material";
import RootLayout from "../../components/layout/root-layout";
import { PageHeading } from "../../components/layout/page-heading";
import CustomerCard from "../../components/customers/customer-card";
import { useCustomersContext } from "../../app/context/customers/use-customers-context";
import { searchCustomers } from "../../shared/api/customers";
import { getLocale } from "../../i18n/languages";

const Distributors = () => {
  const { t, i18n } = useTranslation();
  const [retryKey, setRetryKey] = useState(0);
  const { customers, loading, error, fetchCustomers, attach, detach,
    requests, requestsLoading, requestsError, fetchRequests, approve, reject } = useCustomersContext();
  const [requestsRetryKey, setRequestsRetryKey] = useState(0);
  const [tab, setTab] = useState("mine");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [pendingId, setPendingId] = useState(null);
  const [notice, setNotice] = useState(null);
  const searchController = useRef(null);
  const actionPending = useRef(false);

  useEffect(() => () => searchController.current?.abort(), []);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!query.trim()) return;
    searchController.current?.abort();
    const controller = new AbortController();
    searchController.current = controller;
    setSearchLoading(true);
    setSearchError("");
    setHasSearched(true);
    setResults([]);
    try {
      const { data } = await searchCustomers(query, controller.signal);
      if (controller.signal.aborted) return;
      const items = Array.isArray(data) ? data : data.items ?? data.customers;
      if (!Array.isArray(items)) throw new Error("partners.searchReadError");
      setResults(items);
    } catch (error) {
      if (!controller.signal.aborted) {
        setSearchError(error.response?.data?.message || error.message || "partners.searchError");
      }
    } finally {
      if (!controller.signal.aborted) setSearchLoading(false);
    }
  };

  const handleAction = async (customer, action) => {
    if (actionPending.current) return;
    actionPending.current = true;
    setPendingId(customer.id || customer._id);
    setNotice(null);
    try {
      const actions = {
        attach: { run: attach, message: "partners.sentNotice" },
        detach: { run: detach, message: "partners.detachedNotice" },
        withdraw: { run: detach, message: "partners.withdrawnNotice" },
        approve: { run: approve, message: "partners.approvedNotice" },
        reject: { run: reject, message: "partners.rejectedNotice" },
      };
      await actions[action].run(customer);
      setNotice({ severity: "success", message: actions[action].message });
    } catch (error) {
      setNotice({ severity: "error", message: error.response?.data?.message || "errors.action" });
    } finally {
      actionPending.current = false;
      setPendingId(null);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchCustomers("", controller.signal);
    return () => controller.abort();
  }, [retryKey, fetchCustomers]);

  useEffect(() => {
    const controller = new AbortController();
    fetchRequests(controller.signal);
    return () => controller.abort();
  }, [requestsRetryKey, fetchRequests, tab]);

  return (
    <RootLayout>
      <PageHeading
        title={t("nav.partners")}
        subtitle={t("partners.subtitle")}
      />
      <Box sx={{ maxWidth: 700, mx: "auto", my: 3 }}>
        <Tabs
          value={tab}
          onChange={(_, value) => setTab(value)}
          aria-label={t("partners.cargoOwners")}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}
        >
          <Tab
            value="mine"
            label={t("partners.mine")}
            id="my-customers-tab"
            aria-controls="my-customers-panel"
          />
          <Tab value="search" label={t("partners.searchTab")} id="search-customers-tab" aria-controls="search-customers-panel" />
          <Tab value="requests" label={t("partners.requests")} id="customer-requests-tab" aria-controls="customer-requests-panel" />
        </Tabs>

        {notice && <Alert severity={notice.severity} onClose={() => setNotice(null)} sx={{ mb: 2 }}>{t(notice.message)}</Alert>}

        <Box role="tabpanel" id="my-customers-panel" aria-labelledby="my-customers-tab" hidden={tab !== "mine"}>
          {loading && <CircularProgress aria-label={t("partners.loading")} />}
          {!loading && error && (
            <Alert
              severity="error"
              action={<Button color="inherit" onClick={() => setRetryKey((value) => value + 1)}>{t("common.retry")}</Button>}
            >
              {t(error)}
            </Alert>
          )}
          {!loading && !error && customers.length === 0 && <Alert severity="info">{t("common.empty")}</Alert>}
          {!loading && !error && (
            <Stack spacing={2}>
              {customers.map((customer) => (
                <CustomerCard
                  key={customer.id || customer._id}
                  customer={customer}
                  actionLabel={t("partners.detach")}
                  actionColor="error"
                  actionDisabled={pendingId !== null || !(customer.id || customer._id)}
                  actionLoading={pendingId === (customer.id || customer._id)}
                  onAction={(item) => handleAction(item, "detach")}
                />
              ))}
            </Stack>
          )}
        </Box>
        <Box role="tabpanel" id="search-customers-panel" aria-labelledby="search-customers-tab" hidden={tab !== "search"}>
          <Box component="form" onSubmit={handleSearch} sx={{ display: "flex", gap: 1, mb: 3 }}>
            <TextField
              label={t("partners.search")}
              placeholder={t("partners.searchExample")}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              size="small"
              fullWidth
            />
            <Button type="submit" variant="contained" disabled={!query.trim() || searchLoading}>{t("partners.find")}</Button>
          </Box>
          {searchLoading && <CircularProgress aria-label={t("partners.searching")} />}
          {searchError && <Alert severity="error">{t(searchError)}</Alert>}
          {!hasSearched && <Alert severity="info">{t("partners.searchHint")}</Alert>}
          {requestsError && <Alert severity="error" sx={{ mb: 2 }} action={<Button color="inherit" onClick={() => setRequestsRetryKey((value) => value + 1)}>{t("common.retry")}</Button>}>{t(requestsError)}</Alert>}
          {hasSearched && !searchLoading && !searchError && results.length === 0 && <Alert severity="info">{t("partners.notFound")}</Alert>}
          {!searchLoading && !searchError && (
            <Stack spacing={2}>
              {results.map((customer) => {
                const id = customer.id || customer._id;
                const attached = customers.some((item) => (item.id || item._id) === id);
                const request = requests.find((item) => (item.id || item._id) === id);
                return (
                  <CustomerCard
                    key={id}
                    customer={customer}
                    actionLabel={attached ? t("partners.attached") : request ? (request.direction === "incoming" ? t("partners.incomingExists") : t("partners.sent")) : t("partners.request")}
                    actionDisabled={attached || Boolean(request) || loading || requestsLoading || Boolean(error) || Boolean(requestsError) || pendingId !== null || !id}
                    actionLoading={pendingId === id}
                    onAction={(item) => handleAction(item, "attach")}
                  />
                );
              })}
            </Stack>
          )}
        </Box>
        <Box role="tabpanel" id="customer-requests-panel" aria-labelledby="customer-requests-tab" hidden={tab !== "requests"}>
          {requestsLoading && <CircularProgress aria-label={t("partners.loadingRequests")} />}
          {!requestsLoading && requestsError && (
            <Alert severity="error" action={<Button color="inherit" onClick={() => setRequestsRetryKey((value) => value + 1)}>{t("common.retry")}</Button>}>
              {t(requestsError)}
            </Alert>
          )}
          {!requestsLoading && !requestsError && requests.length === 0 && <Alert severity="info">{t("partners.noRequests")}</Alert>}
          {!requestsLoading && !requestsError && requests.length > 0 && (
            <Stack spacing={3}>
              {[
                { direction: "incoming", title: t("partners.incoming") },
                { direction: "outgoing", title: t("partners.outgoing") },
              ].map(({ direction, title }) => {
                const items = requests.filter((item) => item.direction === direction);
                return (
                  <Stack key={direction} spacing={2}>
                    <Typography component="h2" variant="h6">{title}</Typography>
                    {items.length === 0 && <Typography color="text.secondary">{t("partners.emptyRequests")}</Typography>}
                    {items.map((customer) => {
                      const id = customer.id || customer._id;
                      const busy = pendingId === id;
                      const disabled = pendingId !== null || !id;
                      const date = customer.linkedAt ? new Date(customer.linkedAt) : null;
                      return (
                        <CustomerCard key={id} customer={customer}>
                          <Stack spacing={2}>
                            <Box><Chip size="small" color={direction === "incoming" ? "primary" : "default"} label={direction === "incoming" ? t("partners.incomingRequest") : t("partners.awaitingApproval")} /></Box>
                            {date && !Number.isNaN(date.getTime()) && (
                              <Typography variant="body2" color="text.secondary">
                                {t("partners.requestDate")}{" "}{date.toLocaleString(getLocale(i18n.resolvedLanguage), { timeZone: "Asia/Qyzylorda", dateStyle: "medium", timeStyle: "short" })}
                              </Typography>
                            )}
                            <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
                              {direction === "incoming" ? (
                                <>
                                  <Button variant="contained" disabled={disabled} onClick={() => handleAction(customer, "approve")}>{busy ? t("common.wait") : t("partners.approve")}</Button>
                                  <Button variant="outlined" color="error" disabled={disabled} onClick={() => handleAction(customer, "reject")}>{t("partners.reject")}</Button>
                                </>
                              ) : (
                                <Button variant="outlined" color="error" disabled={disabled} onClick={() => handleAction(customer, "withdraw")}>{busy ? t("common.wait") : t("partners.withdraw")}</Button>
                              )}
                            </Stack>
                          </Stack>
                        </CustomerCard>
                      );
                    })}
                  </Stack>
                );
              })}
            </Stack>
          )}
        </Box>
      </Box>
    </RootLayout>
  );
};

export default Distributors;
