import { SVGProps } from "react";

const PhoneIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-smartphone"
    {...props}
  >
    <rect x={5} y={2} width={14} height={20} rx={2} ry={2} />
    <path d="M12 18h.01" />
  </svg>
);

export default PhoneIcon;
