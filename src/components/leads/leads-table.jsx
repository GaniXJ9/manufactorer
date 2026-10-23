import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import RenderStatus from "../../shared/ui/render-status";

const LeadsTable = ({ leads }) => {
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
      headerName: "Статус",
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
    { field: "num", headerName: "Номер", width: 200 },
    {
      field: "driver",
      headerName: "Водитель",
      width: 200,
      valueGetter: (_, row) => row?.driver?.fio || "",
      renderCell: ({ row }) => {
        return <Box>{row?.driver?.fio || "-"}</Box>;
      },
    },
    {
      field: "customer",
      headerName: "Заказчик",
      width: 200,
      valueGetter: (_, row) => row?.customer?.fullName || row?.customer?.name || "",
      renderCell: ({ row }) => {
        return <Box>{row?.customer?.fullName || row?.customer?.name || "-"}</Box>;
      },
    },
    {
      field: "to_location",
      headerName: "Куда",
      width: 200,
      valueGetter: (_, row) => row?.to_location?.address || row?.to || "",
      renderCell: ({ row }) => (
        <Box>{row?.to_location?.address || row?.to || "Не указан"}</Box>
      ),
    },
    {
      field: "from_location",
      headerName: "Откуда",
      width: 200,
      valueGetter: (_, row) => row?.from_location?.address || row?.from || "",
      renderCell: ({ row }) => (
        <Box>{row?.from_location?.address || row?.from || "Не указан"}</Box>
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
        localeText={{
          noRowsLabel: "Список перевозок пуст",
        }}
      />
    </Paper>
  );
};

export default LeadsTable;
