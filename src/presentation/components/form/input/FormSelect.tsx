import React from "react";
import { Form, Select } from "antd";
import {
  Control,
  Controller,
  FieldError,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { get } from "lodash";
import "./FormSelect.style.css";
import ArrowDownIcon from "@components/icon/ArrowDownIcon";
import SpinnerLoading from "@components/loader/SpinnerLoading";
import TrashIcon from "@components/icon/TrashIcon";
import { IOption } from "@domain/entities/SharedEntity";

const { Option } = Select;

interface FormSelectProps<TFieldValues extends FieldValues = FieldValues> {
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  options: IOption[];
  control: Control<TFieldValues>;
  rules?: Record<string, any>;
  error?: FieldError;
  loading?: boolean;
  allowClear?: boolean;
  onAddNew?: () => void;
  onDelete?: (option: IOption, type: string) => void; // Add this line to the existing code
}

const FormSelect = <TFieldValues extends FieldValues = FieldValues>({
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
  onDelete,
}: FormSelectProps<TFieldValues>) => {
  const uniqueOptions = React.useMemo(() => {
    const seen = new Set<string>();
    return options.filter((option) => {
      const key = `${option.value ?? option.label}`.trim().toLowerCase();
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }, [options]);

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
        render={({ field }) => (
          <div className="tw-w-full tw-flex tw-justify-between tw-gap-2 tw-items-center">
            <Select
              variant="outlined"
              className="custom-select"
              showSearch
              allowClear={allowClear}
              loading={loading}
              {...field}
              filterOption={(input, option) => {
                const searchValue = input.toLowerCase();
                const labelValue = option?.label?.toString().toLowerCase() ?? "";
                const optionValue =
                  option?.value?.toString().toLowerCase() ?? "";
                return (
                  labelValue.includes(searchValue) ||
                  optionValue.includes(searchValue)
                );
              }}
              suffixIcon={
                loading ? (
                  <SpinnerLoading
                    width={12}
                    height={12}
                    type="primary-spinner"
                  />
                ) : (
                  <ArrowDownIcon height={12} width={12} />
                )
              }
              placeholder={placeholder}
            >
              {uniqueOptions.map((option) => (
                <Option
                  key={option.value ?? option.label}
                  value={option.value}
                  label={option.label}
                >
                  <div className="tw-flex tw-justify-between tw-items-center tw-w-full">
                    <span>{option.label}</span>
                    {onDelete &&
                      get(control._formValues, name) !== option.value && (
                        <div
                          className="tw-p-2 hover:tw-bg-red-100 tw-rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(option, name);
                          }}
                        >
                          <TrashIcon
                            width={16}
                            height={16}
                            className="tw-text-red-500"
                          />
                        </div>
                      )}
                  </div>
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
};

export default FormSelect;
