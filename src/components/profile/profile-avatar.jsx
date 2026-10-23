import { useEffect, useRef, useState } from "react";
import { Alert, Avatar, Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

async function validatePhoto(file) {
  if (!["image/png", "image/jpeg"].includes(file.type)) {
    throw new Error("Выберите изображение в формате PNG или JPEG.");
  }

  let bitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new Error("Не удалось открыть изображение. Выберите другой файл.");
  }

  try {
    if (bitmap.width < 400 || bitmap.width > 600 || bitmap.height < 400 || bitmap.height > 600) {
      throw new Error("Ширина и высота фото должны быть от 400 до 600 пикселей.");
    }
  } finally {
    bitmap.close();
  }
}

const ProfileAvatar = ({ avatar, onChange, disabled, onBusyChange }) => {
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
      setError(error.response?.data?.message || error.message || "Не удалось изменить фото профиля");
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
        <Avatar src={avatar || undefined} alt="Фото профиля" sx={{ width: 116, height: 116, bgcolor: "primary.main" }}>
          <PersonIcon sx={{ fontSize: 100 }} />
        </Avatar>
        <Stack spacing={1.5}>
          <Typography sx={{ fontSize: 18 }}>Фото профиля</Typography>
          <Typography id="profile-photo-help">PNG или JPEG, размер от 400×400 до 600×600 px</Typography>
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
              {avatar ? "Изменить фото" : "Загрузить фото"}
            </Button>
            {avatar && (
              <Button color="error" disabled={disabled || busy} onClick={() => changeAvatar(null)}>Удалить фото</Button>
            )}
            {busy && <CircularProgress size={24} aria-label="Проверка фото профиля" />}
          </Box>
        </Stack>
      </Stack>
      {error && <Alert severity="error">{error}</Alert>}
    </Stack>
  );
};

export default ProfileAvatar;
