import React from "react";
import { Form, Input } from "antd";
import { Control, Controller, FieldError } from "react-hook-form";

const { TextArea } = Input;

interface FormTextAreaProps {
  name: string;
  label: string;
  placeholder?: string;
  control: Control<any>;
  rules?: Record<string, any>;
  error?: FieldError;
  rows?: number;
  maxLength?: number;
  allowClear?: boolean;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({
  name,
  label,
  placeholder,
  control,
  rules,
  error,
  rows = 4,
  maxLength,
  allowClear = false,
}) => (
  <Form.Item
    label={label}
    validateStatus={error ? "error" : "success"}
    help={error ? error.message : null}
    className="tw-w-full"
  >
    <Controller
      name={name}
      control={control}
      defaultValue={""}
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