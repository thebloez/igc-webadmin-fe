import isNullOrEmpty from "@lib/utils/isNullOrEmpty";

interface PrintMemoItemProps {
  label: string;
  value: string;
}

export const PrintMemoItem: React.FC<PrintMemoItemProps> = ({
  label,
  value,
}) => {
  return (
    <div className="tw-flex tw-justify-between tw-font-bold tw-py-[6px]">
      <div className="tw-w-[30%]">
        <p className="tw-text-[18pt]">{label}</p>
      </div>
      <div className="tw-w-[5%]">
        <p className="tw-text-[18pt]">:</p>
      </div>
      <div className="tw-w-[65%]">
        <p className="tw-text-[18pt]">{isNullOrEmpty(value) ? "-" : value}</p>
      </div>
    </div>
  );
};
