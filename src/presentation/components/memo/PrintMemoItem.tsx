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
    <div className="tw-flex tw-justify-between tw-font-normal tw-py-[6px] tw-w-full">
      <div className="tw-w-[30%]">
        <p className="tw-text-[20pt]">{label}</p>
      </div>
      <div className="tw-w-[65%]">
        <p className="tw-text-[20pt]"><span className="tw-pr-2">:</span>{isNullOrEmpty(value) ? "-" : value}</p>
      </div>
    </div>
  );
};
