import { Form, Input } from "antd";
import {
  Control,
  Controller,
  FieldError,
  FieldPath,
  FieldValues,
} from "react-hook-form";

const { TextArea } = Input;

interface FormTextAreaProps<TFieldValues extends FieldValues = FieldValues> {
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  control: Control<TFieldValues>;
  rules?: Record<string, any>;
  error?: FieldError;
  rows?: number;
  maxLength?: number;
  allowClear?: boolean;
}

const FormTextArea = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  placeholder,
  control,
  rules,
  error,
  rows = 4,
  maxLength,
  allowClear = false,
}: FormTextAreaProps<TFieldValues>) => (
  <Form.Item
    label={label}
    validateStatus={error ? "error" : "success"}
    help={error ? error.message : null}
    className="tw-w-full"
  >
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextArea
          className="tw-py-2 focus-within:tw-ring-secondary-600 focus-within:tw-ring-2 focus-within:tw-border-transparent"
          style={{ resize: 'none' }}
          {...field}
          rows={rows}
          maxLength={maxLength}
          allowClear={allowClear}
          placeholder={placeholder}
        />
      )}
    />
  </Form.Item>
);

export default FormTextArea;
