import IHeaderContent from "./HeaderContent.interface";

const HeaderContent = ({
  title,
  children,
  description,
  leftIcon,
  className = "xss:tw-items-center",
}: IHeaderContent) => {
  return (
    <div
      className={`${className} tw-bg-blue-50 tw-flex tw-flex-col sm:tw-flex-row tw-gap-4 tw-items-start tw-justify-between tw-p-4 tw-rounded-b-md`}
    >
      <div className="tw-w-full tw-flex-1 tw-flex tw-justify-start tw-items-start">
        {leftIcon && <div className="tw-mr-2 tw-p-1 tw-cursor-pointer">{leftIcon}</div>}
        <div>
          <h1 className="tw-font-semibold tw-text-primary tw-text-lg">
            {title}
          </h1>
          {description && (
            <p className="tw-text-gray-500 tw-text-sm">{description}</p>
          )}
        </div>
      </div>
      <div className="tw-w-full">{children}</div>
    </div>
  );
};

export default HeaderContent;
