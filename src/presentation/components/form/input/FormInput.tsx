import { Form, Input } from "antd";
import { Control, Controller, FieldError } from "react-hook-form";
import EyeIcon from "@components/icon/EyeIcon";
import EyeOffIcon from "@components/icon/EyeOff";

interface FormInputProps {
  name: string;
  label: string;
  disabled?: boolean;
  placeholder?: string;
  type?: string;
  control: Control<any>;
  rules?: Record<string, any>;
  error?: FieldError;
  allowClear?: boolean;
  note?: React.ReactNode;
}

const FormInput: React.FC<FormInputProps> = ({
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
}) => {
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
            />
          )
        }
      />
      {note}
    </Form.Item>
  );
};

export default FormInput;
