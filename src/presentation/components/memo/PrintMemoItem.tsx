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
    <div className="tw-flex tw-justify-start tw-items-center tw-font-normal tw-py-[2px] tw-w-full">
      <div className="tw-w-[25%]">
        <p className="tw-text-[20pt]">{label}</p>
      </div>
      <div className="tw-w-[75%]">
        <p className="tw-text-[20pt]"><span className="tw-pr-2">:</span>{isNullOrEmpty(value) ? "-" : value}</p>
      </div>
    </div>
  );
};
