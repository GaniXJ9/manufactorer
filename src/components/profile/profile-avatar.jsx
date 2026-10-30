import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { Alert, Avatar, Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

async function validatePhoto(file) {
  if (!["image/png", "image/jpeg"].includes(file.type)) {
    throw new Error("profile.photoFormatError");
  }

  let bitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new Error("profile.photoOpenError");
  }

  try {
    if (bitmap.width < 400 || bitmap.width > 600 || bitmap.height < 400 || bitmap.height > 600) {
      throw new Error("profile.photoSizeError");
    }
  } finally {
    bitmap.close();
  }
}

const ProfileAvatar = ({ avatar, onChange, disabled, onBusyChange }) => {
  const { t } = useTranslation();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const requestController = useRef(null);
  const fileInput = useRef(null);

  useEffect(() => () => requestController.current?.abort(), []);

  const changeAvatar = async (file) => {
    if (requestController.current || disabled) return;
    const controller = new AbortController();
    requestController.current = controller;
    setBusy(true);
    onBusyChange(true);
    setError("");

    try {
      if (file) await validatePhoto(file);
      if (controller.signal.aborted) return;
      onChange(file);
    } catch (error) {
      if (controller.signal.aborted) return;
      setError(error.response?.data?.message || error.message || "profile.photoError");
    } finally {
      requestController.current = null;
      if (!controller.signal.aborted) {
        setBusy(false);
        onBusyChange(false);
      }
    }
  };

  return (
    <Stack spacing={2} sx={{ mb: 4 }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={4} alignItems={{ xs: "flex-start", sm: "center" }}>
        <Avatar src={avatar || undefined} alt={t("profile.photo")} sx={{ width: 116, height: 116, bgcolor: "primary.main" }}>
          <PersonIcon sx={{ fontSize: 100 }} />
        </Avatar>
        <Stack spacing={1.5}>
          <Typography sx={{ fontSize: 18 }}>{t("profile.photo")}</Typography>
          <Typography id="profile-photo-help">{t("profile.photoHelp")}</Typography>
          <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", alignItems: "center" }}>
            <input
              ref={fileInput}
              type="file"
              accept="image/png,image/jpeg"
              hidden
              disabled={disabled || busy}
              onChange={(event) => {
                const file = event.target.files?.[0];
                event.target.value = "";
                if (file) changeAvatar(file);
              }}
            />
            <Button
              variant="outlined"
              disabled={disabled || busy}
              aria-describedby="profile-photo-help"
              onClick={() => fileInput.current?.click()}
              sx={{ borderRadius: 1, textTransform: "uppercase", px: 2.5, py: 1 }}
            >
              {avatar ? t("profile.changePhoto") : t("profile.uploadPhoto")}
            </Button>
            {avatar && (
              <Button color="error" disabled={disabled || busy} onClick={() => changeAvatar(null)}>{t("profile.deletePhoto")}</Button>
            )}
            {busy && <CircularProgress size={24} aria-label={t("profile.checkingPhoto")} />}
          </Box>
        </Stack>
      </Stack>
      {error && <Alert severity="error">{t(error)}</Alert>}
    </Stack>
  );
};

export default ProfileAvatar;
