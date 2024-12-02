import React from "react";
import { Form, Select } from "antd";
import { Control, Controller, FieldError } from "react-hook-form";

const { Option } = Select;

import "./FormSelect.style.css";
import ArrowDownIcon from "@components/icon/ArrowDownIcon";
import SpinnerLoading from "@components/loader/SpinnerLoading";

interface FormSelectProps {
  name: string;
  label: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  control: Control<any>;
  rules?: Record<string, any>;
  error?: FieldError;
  loading?: boolean;
  allowClear?: boolean;
  onAddNew?: () => void;
}

const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  placeholder,
  options,
  control,
  rules,
  error,
  loading,
  allowClear = false,
  onAddNew,
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
      rules={rules}
      render={({ field }) => (
        <div className="tw-w-full tw-flex tw-justify-between tw-gap-2 tw-items-end">
          <Select
            variant="outlined"
            className="custom-select"
            showSearch
            allowClear={allowClear}
            loading={loading}
            {...field}
            suffixIcon={
              loading ? (
                <SpinnerLoading width={12} height={12} type="primary-spinner" />
              ) : (
                <ArrowDownIcon height={12} width={12} />
              )
            }
            placeholder={placeholder}
          >
            {options.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
          {onAddNew && (
            <div
              onClick={onAddNew}
              className="tw-w-[50px] tw-h-[38px] tw-rounded tw-flex tw-items-center tw-justify-center tw-cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="512"
                height="512"
                x="0"
                y="0"
                viewBox="0 0 24 24"
                className="tw-w-full tw-h-full"
              >
                <g>
                  <g data-name="Layer 2">
                    <rect
                      width="21.5"
                      height="21.5"
                      x="1.25"
                      y="1.25"
                      fill="#8dd1ff"
                      rx="4.75"
                      opacity="1"
                      data-original="#8dd1ff"
                    ></rect>
                    <path
                      fill="#ffffff"
                      d="M12 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0v10a1 1 0 0 1-1 1z"
                      opacity="1"
                      data-original="#ffffff"
                    ></path>
                    <path
                      fill="#ffffff"
                      d="M7 13a1 1 0 0 1 0-2h10a1 1 0 0 1 0 2z"
                      opacity="1"
                      data-original="#ffffff"
                    ></path>
                    <path
                      fill="#004fac"
                      d="M18 22.75H6A4.756 4.756 0 0 1 1.25 18V6A4.756 4.756 0 0 1 6 1.25h12A4.756 4.756 0 0 1 22.75 6v12A4.756 4.756 0 0 1 18 22.75zm-12-20A3.254 3.254 0 0 0 2.75 6v12A3.254 3.254 0 0 0 6 21.25h12A3.254 3.254 0 0 0 21.25 18V6A3.254 3.254 0 0 0 18 2.75z"
                      opacity="1"
                      data-original="#004fac"
                    ></path>
                  </g>
                </g>
              </svg>
            </div>
          )}
        </div>
      )}
    />
  </Form.Item>
);

export default FormSelect;
