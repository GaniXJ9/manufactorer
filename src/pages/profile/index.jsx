import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Box, Button, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import RootLayout from "../../components/layout/root-layout";
import { PageHeading } from "../../components/layout/page-heading";
import FormControllerInput from "../../shared/input/form-controller-input";
import PrimaryButton from "../../shared/primary-button";
import { deleteAvatar, getProfile, updateProfile, uploadAvatar } from "../../shared/api/profile";
import ProfileAvatar from "../../components/profile/profile-avatar";

const sections = [
  {
    title: "Компания и банковские реквизиты",
    fields: [
      { name: "company_name", label: "Название компании", autoComplete: "organization" },
      { name: "bin", label: "БИН", numeric: true },
      { name: "company_account", label: "Расчётный счёт (IBAN)" },
      { name: "company_bik", label: "БИК банка" },
      { name: "bank_name", label: "Название банка" },
      { name: "company_address", label: "Адрес компании", autoComplete: "street-address" },
    ],
  },
  {
    title: "Личные данные",
    fields: [
      { name: "fio", label: "ФИО", autoComplete: "name" },
      { name: "phone", label: "Телефон", type: "tel", autoComplete: "tel" },
      { name: "email", label: "Электронная почта", type: "email", autoComplete: "email" },
      { name: "iin", label: "ИИН", numeric: true },
    ],
  },
  {
    title: "Документ, удостоверяющий личность",
    fields: [
      { name: "document_number", label: "Номер документа" },
      { name: "issue_country", label: "Страна выдачи" },
      { name: "document_issue_date", label: "Дата выдачи", type: "date" },
      { name: "document_issued_by", label: "Кем выдан" },
    ],
  },
];

const fields = sections.flatMap((section) => section.fields);
const defaultValues = Object.fromEntries(fields.map(({ name }) => [name, ""]));

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [saved, setSaved] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [avatarDraft, setAvatarDraft] = useState(undefined);
  const avatarPreview = useRef(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [avatarBusy, setAvatarBusy] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const saveController = useRef(null);
  const { control, handleSubmit, reset, formState: { isSubmitting, isDirty } } = useForm({ defaultValues });

  useEffect(() => {
    const controller = new AbortController();

    async function loadProfile() {
      setLoading(true);
      setLoadError("");
      try {
        const { data } = await getProfile(controller.signal);
        if (controller.signal.aborted) return;
        reset(Object.fromEntries(fields.map(({ name }) => [name, data[name] ?? ""])));
        setAvatar(data.avatar || "");
      } catch (error) {
        if (controller.signal.aborted) return;
        setLoadError(error.response?.data?.message || error.message || "Не удалось загрузить профиль");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadProfile();
    return () => controller.abort();
  }, [reset, retryKey]);

  useEffect(() => () => {
    saveController.current?.abort();
    if (avatarPreview.current) URL.revokeObjectURL(avatarPreview.current);
  }, []);

  const changeAvatar = (file) => {
    if (avatarPreview.current) URL.revokeObjectURL(avatarPreview.current);
    avatarPreview.current = file ? URL.createObjectURL(file) : null;
    setPreviewUrl(avatarPreview.current || "");
    setAvatarDraft(file);
    setSaved(false);
    setSaveError("");
  };

  const saveProfile = async (values) => {
    if (saveController.current || avatarBusy) return;
    const controller = new AbortController();
    saveController.current = controller;
    setSaveError("");
    setSaved(false);
    try {
      const payload = Object.fromEntries(fields.map(({ name }) => [name, values[name]]));
      await updateProfile(payload, controller.signal);
      if (controller.signal.aborted) return;
      if (avatarDraft !== undefined) {
        if (avatarDraft) await uploadAvatar(avatarDraft, controller.signal);
        else await deleteAvatar(controller.signal);
        if (controller.signal.aborted) return;
      }
      const { data } = await getProfile(controller.signal);
      if (controller.signal.aborted) return;
      setAvatar(data.avatar || "");
      setAvatarDraft(undefined);
      if (avatarPreview.current) URL.revokeObjectURL(avatarPreview.current);
      avatarPreview.current = null;
      setPreviewUrl("");
      reset(values);
      setSaved(true);
    } catch (error) {
      if (controller.signal.aborted) return;
      setSaveError(error.response?.data?.message || error.message || "Не удалось сохранить профиль");
    } finally {
      saveController.current = null;
    }
  };

  return (
    <RootLayout>
      <PageHeading title="Профиль" subtitle="Данные компании и контактного лица" />
      {loading && <CircularProgress aria-label="Загрузка профиля" />}
      {!loading && loadError && (
        <Alert
          severity="error"
          action={<Button color="inherit" onClick={() => setRetryKey((value) => value + 1)}>Повторить</Button>}
        >
          {loadError}
        </Alert>
      )}
      {!loading && !loadError && (
        <Paper variant="outlined" sx={{ mt: 3, mb: 4, mx: "auto", width: "100%", p: { xs: 2, sm: 3 }, maxWidth: 700, borderRadius: 4 }}>
          <ProfileAvatar avatar={avatarDraft === undefined ? avatar : previewUrl} onChange={changeAvatar} disabled={isSubmitting} onBusyChange={setAvatarBusy} />
          <Box component="form" onSubmit={(event) => handleSubmit(saveProfile)(event)} onChange={() => { setSaved(false); setSaveError(""); }}>
            <Box component="fieldset" disabled={isSubmitting || avatarBusy} sx={{ border: 0, p: 0, m: 0, minWidth: 0 }}>
              <Stack spacing={4}>
                {sections.map(({ title, fields: sectionFields }, sectionIndex) => (
                  <Stack component="section" spacing={3} key={title} aria-labelledby={`profile-section-${sectionIndex}`}>
                    <Typography component="h2" variant="h6" id={`profile-section-${sectionIndex}`}>{title}</Typography>
                    {sectionFields.map(({ name, label, numeric, ...props }) => (
                      <FormControllerInput
                        key={name}
                        name={name}
                        label={label}
                        control={control}
                        fullWidth
                        rules={numeric ? { pattern: { value: /^\d{12}$/, message: "Введите 12 цифр" } } : undefined}
                        slotProps={numeric ? { htmlInput: { inputMode: "numeric", maxLength: 12 } } : undefined}
                        {...props}
                      />
                    ))}
                  </Stack>
                ))}
                {saveError && <Alert severity="error">{saveError}</Alert>}
                {saved && <Alert severity="success">Профиль успешно сохранён</Alert>}
                <PrimaryButton
                  type="submit"
                  text={isSubmitting ? "Сохранение…" : "Сохранить изменения"}
                  isLoading={isSubmitting}
                  disabled={(!isDirty && avatarDraft === undefined) || avatarBusy}
                  sx={{ alignSelf: "flex-start" }}
                />
              </Stack>
            </Box>
          </Box>
        </Paper>
      )}
    </RootLayout>
  );
};

export default Profile;
