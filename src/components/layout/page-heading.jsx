import { Box, Typography } from "@mui/material";

export function PageHeading({ title, subtitle }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography component="h1" variant="h4" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography component="p" variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
