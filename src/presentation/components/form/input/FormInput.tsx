import { Form, Input } from "antd";
import {
  Control,
  Controller,
  FieldError,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import EyeIcon from "@components/icon/EyeIcon";
import EyeOffIcon from "@components/icon/EyeOff";

interface FormInputProps<TFieldValues extends FieldValues = FieldValues> {
  name: FieldPath<TFieldValues>;
  label: string;
  disabled?: boolean;
  placeholder?: string;
  type?: string;
  control: Control<TFieldValues>;
  rules?: Record<string, any>;
  error?: FieldError;
  allowClear?: boolean;
  note?: React.ReactNode;
  suffix?: React.ReactNode;
}

const FormInput = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  placeholder,
  disabled = false,
  type = "text",
  control,
  rules,
  error,
  allowClear = false,
  note,
  suffix
}: FormInputProps<TFieldValues>) => {
  return (
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
        render={({ field }) =>
          type === "password" ? (
            <Input.Password
              className="tw-py-2 focus-within:tw-ring-secondary-600 focus-within:tw-ring-2 focus-within:tw-border-transparent"
              {...field}
              placeholder={placeholder}
              disabled={disabled}
              suffix={suffix}
              iconRender={(visible) =>
                visible ? (
                  <EyeIcon width={16} className="tw-text-red-500" />
                ) : (
                  <EyeOffIcon width={16} className="tw-text-red-500" />
                )
              }
            />
          ) : (
            <Input
              className="tw-py-2 focus-within:tw-ring-secondary-600 focus-within:tw-ring-2 focus-within:tw-border-transparent"
              {...field}
              allowClear={allowClear}
              placeholder={placeholder}
              type={type}
              disabled={disabled}
              suffix={suffix}
            />
          )
        }
      />
      {note}
    </Form.Item>
  );
};

export default FormInput;
