import { SVGProps } from "react";
const DotIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={12}
    viewBox="0 0 13 12"
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M12.036 5.922 6.18.067.326 5.922l5.855 5.855 5.855-5.855Z"
      style={{
        fillOpacity: 1,
      }}
    />
  </svg>
);
export default DotIcon;
