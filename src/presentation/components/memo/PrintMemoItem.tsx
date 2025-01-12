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
    <div className="tw-flex tw-justify-between tw-py-2">
      <div className="tw-w-[30%]">
        <p className="tw-text-base">{label}</p>
      </div>
      <div className="tw-w-[5%]">
        <p>:</p>
      </div>
      <div className="tw-w-[65%]">
        <p className="tw-text-base">{isNullOrEmpty(value) ? "-" : value}</p>
      </div>
    </div>
  );
};
