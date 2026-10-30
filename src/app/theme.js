import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    font_color: { heading: "rgb(22,36,62)" },
    primary: {
      main: "#1956cc",
      light: "#e5edfb",
      dark: "#1243a3",
      contrastText: "#ffffff",
    },
    background: {
      main: "#2196f31a",
      slate: "rgba(148, 163, 184, 0.1)",
      default: "#f5f7fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#172b4d",
      secondary: "#526381",
    },
    divider: "#dedede",
    action: {
      hover: "rgba(25, 86, 204, 0.04)",
      selected: "rgba(25, 86, 204, 0.08)",
      focus: "rgba(25, 86, 204, 0.12)",
    },
  },
  shape: { borderRadius: 4 },
  typography: {
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
    h4: { fontSize: "2rem", fontWeight: 600, lineHeight: 1.25 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 500 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: "#f5f7fa" },
        "a": { color: "#005bff" },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10 },
        contained: { boxShadow: "0 2px 4px rgba(23, 43, 77, 0.2)" },
        containedPrimary: {
          "&:hover": { boxShadow: "0 3px 8px rgba(23, 43, 77, 0.2)" },
        },
        outlinedPrimary: { color: "#005bff", borderColor: "#6d94ff" },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          borderRadius: 16,
          boxShadow: "0 2px 8px rgba(23, 43, 77, 0.06)",
        },
        outlined: { boxShadow: "none" },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 10 },
        notchedOutline: { borderColor: "#bfc4cc" },
      },
    },
    MuiInputLabel: {
      styleOverrides: { root: { color: "#526381" } },
    },
    MuiChip: {
      styleOverrides: {
        outlinedPrimary: { color: "#005bff", borderColor: "#6d94ff" },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: "#737b87",
          borderColor: "#d2d7e0",
          "&.Mui-selected": {
            color: "#1956cc",
            backgroundColor: "#e2e9f9",
            "&:hover": { backgroundColor: "#d8e3f7" },
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: "#526381",
          "&.Mui-selected": {
            backgroundColor: "#e4eaf6",
            "&:hover": { backgroundColor: "#dce5f5" },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: { color: "#526381", backgroundColor: "#f5f7fa", fontWeight: 600 },
      },
    },
    MuiDialog: {
      styleOverrides: { paper: { border: "1px solid #dedede" } },
    },
  },
});
