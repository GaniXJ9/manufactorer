import { TextField } from "@mui/material";

const FormInput = ({ field, slotProps, sx, ...props }) => {
  return (
    <TextField
      {...field}
      {...props}
      slotProps={{
        ...slotProps,
        inputLabel: {
          shrink: true,
          ...slotProps?.inputLabel,
        },
      }}
      sx={[
        {
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
          },
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    />
  );
};

export default FormInput;
