import { Box } from "@mui/material";
import { AppBreadcrumbs } from "./app-breadcrumbs";

const RootLayout = ({ children, breadcrumbTitle, ...props }) => {
  return (
    <Box
      sx={{
        zIndex: 0,
        paddingLeft: 10,
        paddingRight: 5,
        paddingTop: 13,
      }}
      {...props}
    >
      <AppBreadcrumbs currentTitle={breadcrumbTitle} />
      {children}
    </Box>
  );
};

export default RootLayout;
