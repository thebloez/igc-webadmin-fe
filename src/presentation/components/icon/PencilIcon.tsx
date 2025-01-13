import { SVGProps } from "react";
const PencilIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      d="M2.5 14.55v2.533c0 .234.183.417.417.417H5.45a.391.391 0 0 0 .292-.125l9.1-9.092-3.125-3.125-9.092 9.092a.41.41 0 0 0-.125.3Zm14.758-8.683a.829.829 0 0 0 0-1.175l-1.95-1.95a.83.83 0 0 0-1.175 0l-1.525 1.525 3.125 3.125 1.525-1.525Z"
    />
  </svg>
);
export default PencilIcon;
