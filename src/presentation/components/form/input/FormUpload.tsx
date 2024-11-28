import React, { useState } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { Upload, Button, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { get } from "lodash";

interface FormUploadProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  control: Control<any>;
  rules?: Record<string, any>;
  error?: FieldError;
}

/**
 * FormUpload Component
 * @component
 * @description A form upload component that allows image upload with preview functionality.
 * Integrates with React Hook Form for form handling and Ant Design for UI components.
 *
 * @example
 * ```tsx
 * <FormUpload
 *   name="logo"
 *   label="Upload Logo"
 *   control={control}
 *   rules={{ required: "Logo is required" }}
 *   error={errors.logo}
 * />
 * ```
 *
 * @param {FormUploadProps} props Component props
 * @param {string} props.name - Field name for the form control
 * @param {string} props.label - Label text to display above the upload field
 * @param {Control<any>} props.control - React Hook Form control instance
 * @param {Record<string,any>} [props.rules] - Validation rules for the field
 * @param {FieldError} [props.error] - Field error object from React Hook Form
 *
 * @returns {JSX.Element} FormUpload component
 */
const FormUpload: React.FC<FormUploadProps> = ({
  name,
  label,
  control,
  rules,
  error,
}) => {
  const getValue = get(control._formValues, name);

  const [previewImage, setPreviewImage] = useState<string | undefined>(
    getValue ?? ""
  );

  const handlePreview = (file: any) => {
    setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <Form.Item
      label={label}
      validateStatus={error ? "error" : "success"}
      help={error?.message}
    >
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <div className="tw-w-full tw-flex tw-justify-start tw-items-start tw-gap-6">
            <Upload
              accept=".jpg,.png"
              showUploadList={false}
              beforeUpload={(file) => {
                field.onChange(file);
                handlePreview(file);
                return false;
              }}
              maxCount={1}
            >
              {getValue ? (
                <div className="tw-relative tw-w-[180px] tw-border tw-rounded tw-cursor-pointer">
                  <div className="tw-absolute -tw-right-2 -tw-top-2">
                    <svg
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="36" height="36" rx="18" fill="#056EB5" />
                      <path
                        d="M10.5 22.5501V25.0834C10.5 25.3167 10.6833 25.5001 10.9167 25.5001H13.45C13.5583 25.5001 13.6667 25.4584 13.7417 25.3751L22.8417 16.2834L19.7167 13.1584L10.625 22.2501C10.5417 22.3334 10.5 22.4334 10.5 22.5501ZM25.2583 13.8668C25.3356 13.7897 25.3969 13.6981 25.4387 13.5973C25.4805 13.4965 25.502 13.3884 25.502 13.2792C25.502 13.1701 25.4805 13.062 25.4387 12.9612C25.3969 12.8604 25.3356 12.7688 25.2583 12.6918L23.3083 10.7418C23.2312 10.6645 23.1397 10.6032 23.0389 10.5614C22.938 10.5196 22.83 10.498 22.7208 10.498C22.6117 10.498 22.5036 10.5196 22.4028 10.5614C22.302 10.6032 22.2104 10.6645 22.1333 10.7418L20.6083 12.2667L23.7333 15.3917L25.2583 13.8668Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <img
                    alt="Preview"
                    className="tw-w-full tw-h-full tw-object-fill tw-rounded-md "
                    src={previewImage}
                  />
                </div>
              ) : (
                <Button
                  className="tw-border tw-w-[110px] tw-border-primary-500 tw-text-primary-500 tw-font-semibold tw-px-4 tw-py-5 tw-mb-2 tw-rounded-md"
                  icon={<UploadOutlined className="tw-text-primary-500" />}
                >
                  Upload
                </Button>
              )}
            </Upload>
          </div>
        )}
      />
    </Form.Item>
  );
};

export default FormUpload;
