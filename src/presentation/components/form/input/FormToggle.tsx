import { Form, Switch } from "antd";
import {
  Control,
  Controller,
  FieldError,
  FieldPath,
  FieldValues,
} from "react-hook-form";

interface FormToggleProps<TFieldValues extends FieldValues = FieldValues> {
  name: FieldPath<TFieldValues>;
  label: string;
  control: Control<TFieldValues>;
  rules?: Record<string, any>;
  checkedChildren?: string;
  unCheckedChildren?: string;
  error?: FieldError;
}

const FormToggle = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  control,
  rules,
  error,
}: FormToggleProps<TFieldValues>) => (
  <Form.Item
    label={label}
    validateStatus={error ? "error" : "success"}
    help={error ? error.message : null}
    className="tw-w-full tw-flex tw-items-center"
  >
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <Switch
          {...field}
          checked={field.value}
          onChange={(checked) => field.onChange(checked)}
        />
      )}
    />
  </Form.Item>
);

export default FormToggle;
