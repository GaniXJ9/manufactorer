import { useTranslation } from "react-i18next";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import RenderStatus from "../../shared/ui/render-status";
import { getDataGridLocale } from "../../i18n/data-grid";

const LeadsTable = ({ leads }) => {
  const { t, i18n } = useTranslation();
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 200,
      renderCell: ({ row }) => (
        <NavLink
          to={`/leads/${row.id}`}
          style={{
            textDecoration: "none",
          }}
        >
          {row.id}
        </NavLink>
      ),
    },
    {
      field: "status",
      valueGetter: (_, row) => row.status,
      headerName: t("leads.status"),
      width: 200,
      renderCell: ({ row }) => (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <RenderStatus status={row.status} />
        </Box>
      ),
    },
    { field: "num", headerName: t("leads.number"), width: 200 },
    {
      field: "driver",
      headerName: t("leads.driver"),
      width: 200,
      valueGetter: (_, row) => row?.driver?.fio || "",
      renderCell: ({ row }) => {
        return <Box>{row?.driver?.fio || "-"}</Box>;
      },
    },
    {
      field: "customer",
      headerName: t("common.customer"),
      width: 200,
      valueGetter: (_, row) => row?.customer?.fullName || row?.customer?.name || "",
      renderCell: ({ row }) => {
        return <Box>{row?.customer?.fullName || row?.customer?.name || "-"}</Box>;
      },
    },
    {
      field: "to_location",
      headerName: t("lead.to"),
      width: 200,
      valueGetter: (_, row) => row?.to_location?.address || row?.to || "",
      renderCell: ({ row }) => (
        <Box>{row?.to_location?.address || row?.to || t("common.notSpecifiedMale")}</Box>
      ),
    },
    {
      field: "from_location",
      headerName: t("lead.from"),
      width: 200,
      valueGetter: (_, row) => row?.from_location?.address || row?.from || "",
      renderCell: ({ row }) => (
        <Box>{row?.from_location?.address || row?.from || t("common.notSpecifiedMale")}</Box>
      ),
    },
  ];

  return (
    <Paper sx={{ mt: "10px", mb: 0 }}>
      <DataGrid
        hideFooter
        rows={leads}
        getRowId={(row) => row.id}
        columns={columns}
        checkboxSelection
        sx={{
          border: 0,
          boxShadow: 0,
          minHeight: "80vh",
          "& .MuiDataGrid-row:nth-of-type(even)": {
            backgroundColor: "#f5f7fa",
          },

          "& .MuiDataGrid-row:nth-of-type(odd)": {
            backgroundColor: "#ffffff",
          },
          "& .MuiDataGrid-row.lead-draft": {
            backgroundColor: "#fff8e1",
            borderLeft: "3px solid",
            borderLeftColor: "warning.main",
          },
        }}
        localeText={getDataGridLocale(t, i18n.resolvedLanguage)}
      />
    </Paper>
  );
};

export default LeadsTable;
