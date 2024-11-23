import MappingIcon from "@components/sidebar/MappingIcon";
import tailwindMerge from "@lib/utils/tailwindMerge";
import { Card } from "antd";

interface StatCardProps {
  color: string;
  bgIcon: string;
  icon: string;
  value: string | number;
  title: string;
}

const StatCard = ({ color, bgIcon, icon, value, title }: StatCardProps) => {
  return (
    <Card className={`${color} tw-rounded-lg`}>
      <div
        className={tailwindMerge(
          bgIcon,
          "tw-w-[32px] tw-h-[32px] tw-flex tw-items-center tw-justify-center tw-rounded-full"
        )}
      >
        <MappingIcon className="tw-h-[18px] tw-text-white" iconType={icon} />
      </div>
      <div className="tw-flex tw-items-center tw-gap-4">
        <div>
          <p className="tw-font-semibold tw-text-xl">{value}</p>
          <p>{title}</p>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
