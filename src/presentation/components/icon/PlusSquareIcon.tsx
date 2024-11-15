import { SVGProps } from "react";

const PlusSquareIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-plus-square"
    {...props}
  >
    <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
    <path d="M12 8v8M8 12h8" />
  </svg>
);

export default PlusSquareIcon;
