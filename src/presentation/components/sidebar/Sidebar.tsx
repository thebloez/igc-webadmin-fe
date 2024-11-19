import MenuItem from "./MenuItem";
import BurgerIcon from "@components/icon/BurgerIcon";
import ArrowLeftIcon from "@components/icon/ArrowLeftIcon";
import { IMenuSidebar, ISidebar } from "./Sidebar.interface";
import logo from "@assets/svg/logo.svg";

import "./Sidebar.style.css";
import useSidebar from "@lib/hooks/useSidebar";
import { useLanguage } from "@lib/hooks/useLanguage";

const chooseTypeSidebar = (isFullSidebar: boolean, isHoverChildren: boolean) =>
  isFullSidebar || isHoverChildren ? "sidebar-full" : "sidebar-hide";

const Sidebar = ({
  onBurgerClick,
  isFullSidebar,
  isHoverChildren,
  onMouseEnterMenuItem,
  onMouseLeaveMenuItem,
}: ISidebar) => {
  const { sidebars, location } = useSidebar();
  const { language } = useLanguage();
  
  const isActive = (url: string) => {
    const arrayUrl = location.pathname.split("/");
    if (arrayUrl.includes("add") || arrayUrl.includes("edit")) {
      return arrayUrl.includes(url.replace("/", ""));
    }
    return url === location.pathname;
  };

  return (
    <div
      className={`sidebar ${chooseTypeSidebar(isFullSidebar, isHoverChildren)}`}
    >
      <div
        className={`sidebar-content ${
          isFullSidebar ? "sidebar-content-full" : "sidebar-content-hide"
        }`}
      >
        <div className="wrapper-sidebar">
          <div className="logo-container">
            <div
              onClick={onBurgerClick}
              className="tw-cursor-pointer tw-rounded hover:tw-bg-secondary-700 tw-bg-primary-500 hover:tw-bg-opacity-30 tw-p-2"
            >
              <BurgerIcon className="tw-text-white tw-hidden md:tw-block" />
              <ArrowLeftIcon className="tw-text-primary-90 tw-block md:tw-hidden" />
            </div>
            {isFullSidebar && (
              <div className="tw-flex tw-justify-start tw-items-center">
                <img src={logo} alt="Logo" className="tw-w-10 tw-h-10" />
              </div>
            )}
          </div>
          <ul
            className="menu-item-container"
            onMouseEnter={onMouseEnterMenuItem}
            onMouseLeave={onMouseLeaveMenuItem}
          >
            {sidebars.map((menu: IMenuSidebar, index: number) => (
              <MenuItem
                id={index}
                iconType={menu.iconType}
                isShowChild={menu.isShowChild}
                isFullSidebar={isFullSidebar}
                isHoverChildren={isHoverChildren}
                key={index}
                link={menu.url}
                pathName={location.pathname}
                isActive={isActive(menu.url)}
                name={menu.menuName[language]}
                isHasChild={!!menu.menu?.length}
                child={menu.menu}
                menuId={menu.menuId}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
