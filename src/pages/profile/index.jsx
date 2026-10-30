import { useTranslation } from "react-i18next";
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
    title: "profile.companySection",
    fields: [
      { name: "company_name", label: "profile.companyName", autoComplete: "organization" },
      { name: "bin", label: "common.bin", numeric: true },
      { name: "company_account", label: "profile.iban" },
      { name: "company_bik", label: "profile.bik" },
      { name: "bank_name", label: "profile.bankName" },
      { name: "company_address", label: "profile.companyAddress", autoComplete: "street-address" },
    ],
  },
  {
    title: "profile.personalSection",
    fields: [
      { name: "fio", label: "profile.fullName", autoComplete: "name" },
      { name: "phone", label: "profile.phone", type: "tel", autoComplete: "tel" },
      { name: "email", label: "profile.email", type: "email", autoComplete: "email" },
      { name: "iin", label: "profile.iin", numeric: true },
    ],
  },
  {
    title: "profile.identitySection",
    fields: [
      { name: "document_number", label: "profile.documentNumber" },
      { name: "issue_country", label: "profile.issueCountry" },
      { name: "document_issue_date", label: "profile.issueDate", type: "date" },
      { name: "document_issued_by", label: "profile.issuedBy" },
    ],
  },
];

const fields = sections.flatMap((section) => section.fields);
const defaultValues = Object.fromEntries(fields.map(({ name }) => [name, ""]));

const Profile = () => {
  const { t } = useTranslation();
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
        setLoadError(error.response?.data?.message || error.message || "profile.loadError");
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
      setSaveError(error.response?.data?.message || error.message || "profile.saveError");
    } finally {
      saveController.current = null;
    }
  };

  return (
    <RootLayout>
      <PageHeading title={t("nav.profile")} subtitle={t("profile.subtitle")} />
      {loading && <CircularProgress aria-label={t("profile.loading")} />}
      {!loading && loadError && (
        <Alert
          severity="error"
          action={<Button color="inherit" onClick={() => setRetryKey((value) => value + 1)}>{t("common.retry")}</Button>}
        >
          {t(loadError)}
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
                    <Typography component="h2" variant="h6" id={`profile-section-${sectionIndex}`}>{t(title)}</Typography>
                    {sectionFields.map(({ name, label, numeric, ...props }) => (
                      <FormControllerInput
                        key={name}
                        name={name}
                        label={t(label)}
                        control={control}
                        fullWidth
                        rules={numeric ? { pattern: { value: /^\d{12}$/, message: "profile.twelveDigits" } } : undefined}
                        slotProps={numeric ? { htmlInput: { inputMode: "numeric", maxLength: 12 } } : undefined}
                        {...props}
                      />
                    ))}
                  </Stack>
                ))}
                {saveError && <Alert severity="error">{t(saveError)}</Alert>}
                {saved && <Alert severity="success">{t("profile.saved")}</Alert>}
                <PrimaryButton
                  type="submit"
                  text={isSubmitting ? t("profile.saving") : t("profile.save")}
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
