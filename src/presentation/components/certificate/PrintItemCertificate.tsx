import DotIcon from "@components/icon/DotIcon";
import tailwindMerge from "@lib/utils/tailwindMerge";

interface IPrintItemCertificate {
  title: string;
  value: string;
  color: string;
  direction?: "row" | "col";
}

const PrintItemCertificate = ({
  title,
  value,
  color,
  direction = "row",
}: IPrintItemCertificate) => {
  return (
    <div className={
      tailwindMerge("tw-flex tw-justify-start tw-pb-1 tw-gap-2 tw-w-full", {
        "tw-items-start": direction === "col",
        "tw-items-center": direction === "row",
      })
    }>
      <div className="tw-py-2">
        <DotIcon
          style={{
            color: color,
          }}
        />
      </div>
      <div
        className={tailwindMerge("tw-flex tw-w-full  tw-justify-between", {
          "tw-flex-col": direction === "col",
          "tw-flex-row tw-items-center": direction === "row",
        })}
      >
        <div className="tw-w-[35%]">
          <p className="tw-font-semibold tw-text-base">{title}</p>
        </div>
        <div className="tw-w-[65%]">
          <p className="tw-text-sm tw-text-[#444444]">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default PrintItemCertificate;
