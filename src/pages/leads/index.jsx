import { Alert, Box, Button, CircularProgress, Pagination, Stack } from "@mui/material";
import RootLayout from "../../components/layout/root-layout";
import { PageHeading } from "../../components/layout/page-heading";
import LeadCard from "../../components/leads/lead-card";
import ViewTabs from "../../shared/view-tabs";
import FormInput from "../../shared/input/form-input";
import { useEffect, useState } from "react";
import { useLeadsContext } from "../../app/context/leads/use-leads-context";
import { VIEWS } from "../../shared/const/view";
import LeadsTable from "../../components/leads/leads-table";

const Leads = () => {
  const [view, setView] = useState(VIEWS.table);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ date_from: "", date_to: "", customer_id: "" });
  const [params, setParams] = useState({});
  const { leads, loading, error, pagination, fetchLeads } = useLeadsContext();

  useEffect(() => {
    const controller = new AbortController();
    fetchLeads(params, controller.signal);
    return () => controller.abort();
  }, [params, fetchLeads]);

  const applyFilters = (event) => {
    event.preventDefault();
    setSearch("");
    setParams(Object.fromEntries(
      Object.entries(filters).map(([key, value]) => [key, value.trim()])
        .filter(([, value]) => value !== ""),
    ));
  };

  const resetFilters = () => {
    setFilters({ date_from: "", date_to: "", customer_id: "" });
    setSearch("");
    setParams({});
  };

  const query = search.trim().toLocaleLowerCase();
  const visibleLeads = leads.filter((lead) =>
    [lead.num, lead.customer?.fullName, lead.customer?.name, lead.driver?.fio,
      lead.from_location?.city, lead.from_location?.address,
      lead.to_location?.city, lead.to_location?.address]
      .some((value) => String(value ?? "").toLocaleLowerCase().includes(query)),
  );

  const changePage = (page) => {
    setSearch("");
    setParams((current) => ({ ...current, page }));
  };

  const isCardView = view === VIEWS.cards;
  const isTableView = view === VIEWS.table;
  const page = params.page || 1;
  const pageCount = Math.max(1, Math.ceil(pagination.count / pagination.per_page));

  return (
    <RootLayout>
      <PageHeading
        title="Перевозки"
        subtitle="Управление заявками на перевозку"
      />

      <Box component="form" onSubmit={applyFilters} sx={{ display: "flex", flexWrap: "wrap", gap: 2, my: 2 }}>
        <FormInput
          label="Созданы с" type="date" size="small"
          value={filters.date_from}
          onChange={(event) => setFilters({ ...filters, date_from: event.target.value })}
          slotProps={{ htmlInput: { max: filters.date_to || undefined } }}
        />
        <FormInput
          label="Созданы по" type="date" size="small"
          value={filters.date_to}
          onChange={(event) => setFilters({ ...filters, date_to: event.target.value })}
          slotProps={{ htmlInput: { min: filters.date_from || undefined } }}
        />
        <FormInput
          label="ID заказчика" size="small"
          value={filters.customer_id}
          onChange={(event) => setFilters({ ...filters, customer_id: event.target.value })}
        />
        <Button type="submit" variant="contained" disabled={loading}>Применить</Button>
        <Button onClick={resetFilters} disabled={loading}>Сбросить</Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mx: "auto",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          width: {
            xs: "100%",
            sm: isCardView ? "60%" : "100%",
          },
        }}
      >
        <ViewTabs view={view} setView={setView} />
        <FormInput
          size="small"
          label="Поиск на странице"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          fullWidth
          sx={{
            width: { xs: "100%", sm: 300 },
            maxWidth: { sm: 300 },
            minWidth: 0,
            flexShrink: 1,
            ml: { sm: "auto" },
            my: 1,
          }}
        />
      </Box>

      <Box sx={{ mt: 3, mx: "auto", width: { xs: "100%", sm: isCardView ? "60%" : "100%" } }}>
        {loading && <CircularProgress aria-label="Загрузка перевозок" />}
        {!loading && error && <Alert severity="error" action={<Button color="inherit" onClick={() => setParams({ ...params })}>Повторить</Button>}>{error}</Alert>}
        {!loading && !error && visibleLeads.length === 0 && (
          <Alert severity="info">Список пуст</Alert>
        )}
        {!loading && !error && visibleLeads.length > 0 && isCardView && (
          <Stack spacing={2}>
            {visibleLeads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
          </Stack>
        )}

        {!loading && !error && visibleLeads.length > 0 && isTableView && <LeadsTable leads={visibleLeads} />}
      </Box>
      {!error && (leads.length > 0 || page > 1) && (
        <Pagination
          count={pageCount}
          page={page}
          onChange={(_, nextPage) => changePage(nextPage)}
          disabled={loading}
          color="primary"
          shape="rounded"
          size="medium"
          aria-label="Страницы перевозок"
          sx={{
            mx: "auto",
            mb: 2,
            mt: isCardView ? 2 : 0,
            width: { xs: "100%", sm: isCardView ? "60%" : "100%" },
            minHeight: 48,
            py: 1,
            px: 1,
            bgcolor: "#f5f7fa",
            borderTop: "1px solid",
            borderColor: "divider",
            "& .MuiPagination-ul": {
              justifyContent: "center",
              flexWrap: "wrap",
              rowGap: 1,
            },
            "& .MuiPaginationItem-root": {
              minWidth: 32,
              height: 32,
              mx: 0.25,
              borderRadius: "5px",
              fontSize: 15,
              color: "#182230",
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              bgcolor: "#1955d4",
              color: "#ffffff",
              "&:hover": { bgcolor: "#164bbd" },
            },
          }}
        />
      )}
    </RootLayout>
  );
};

export default Leads;
