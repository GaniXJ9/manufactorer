import { forwardRef } from "react";
import { IconButton, Tooltip } from "@mui/material";
const TooltipIconButton = forwardRef(function TooltipIconButton({ title, "aria-label": ariaLabel, disabled, ...props }, ref) {
  const button = <IconButton {...props} ref={ref} disabled={disabled} aria-label={ariaLabel || title} />;
  return <Tooltip title={title || ariaLabel}>{disabled ? <span style={{ display: "inline-flex" }}>{button}</span> : button}</Tooltip>;
});
export default TooltipIconButton;
