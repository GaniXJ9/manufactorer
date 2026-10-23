import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import InfoItem from "../../shared/ui/info-item";

const CustomerCard = ({
  customer,
  setSelectedCustomer,
  actionLabel,
  onAction,
  actionDisabled,
  actionLoading,
  actionColor = "primary",
  children,
}) => {
  const handleSetCustomerDetails = () => {
    setSelectedCustomer?.(customer);
  };

  return (
    <Box
      tabIndex={setSelectedCustomer ? 0 : undefined}
      onClick={handleSetCustomerDetails}
      sx={{
        p: 3,
        border: "2px solid",
        borderColor: "divider",
        borderRadius: 4,
        backgroundColor: "background.paper",
        boxShadow: "0 2px 8px rgba(23, 43, 77, 0.06)",
        transition: "0.2s ease",
        cursor: setSelectedCustomer ? "pointer" : "default",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: "0 4px 12px rgba(23, 43, 77, 0.08)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Stack>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 0.75, display: "flex", alignItems: "center" }}
          >
            Заказчик
          </Typography>

          <Typography
            sx={{
              lineHeight: 1.3,
              fontSize: {
                xs: "16px",
                sm: "18px",
              },
              fontWeight: 500,
            }}
          >
            {customer?.fullName || customer?.name || "Не указано"}
          </Typography>
        </Stack>

        <Chip
          label={`ID# ${customer?.id || customer?._id}`}
          color="primary"
          variant="outlined"
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          my: 2,
        }}
      >
        {customer?.bank_name && (
          <InfoItem label="Банк" value={customer.bank_name} />
        )}
        <InfoItem label="БИН" value={customer?.bin} />
        {customer?.legal_address && (
          <InfoItem label="Адрес заказчика" value={customer.legal_address} />
        )}
      </Box>
      {children}
      {onAction && (
        <Button
          variant="outlined"
          color={actionColor}
          disabled={actionDisabled || actionLoading}
          onClick={(event) => {
            event.stopPropagation();
            onAction(customer);
          }}
        >
          {actionLoading ? "Подождите…" : actionLabel}
        </Button>
      )}
    </Box>
  );
};

export default CustomerCard;
