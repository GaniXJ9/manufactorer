import FormInput from "./form-input";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

const FormControllerInput = ({ name, control, rules, onChange, ...props }) => {
  const { t } = useTranslation();
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormInput
          field={field}
          error={Boolean(fieldState.error)}
          helperText={fieldState.error?.message ? t(fieldState.error.message) : undefined}
          onChange={(event) => {
            field.onChange(event);
            onChange?.(event);
          }}
          {...props}
        />
      )}
    />
  );
};

export default FormControllerInput;
