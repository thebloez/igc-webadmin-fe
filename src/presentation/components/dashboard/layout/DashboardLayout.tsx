import { useEffect, useState } from "react";
import IDashboardLayoutProps from "./DashboardLayout.interface";
import ContainerLayout from "./ContainerLayout";
import tailwindMerge from "../../../../infrastructure/lib/utils/tailwindMerge";
import Sidebar from "@components/sidebar/Sidebar";
import Header from "@components/header/Header";

const DashboardLayout: React.FC<IDashboardLayoutProps> = ({ children }) => {
  const [isFullSidebar, setIsFullSidebar] = useState(true);
  const [isHoverChildren, setIsHoverChildren] = useState(false);
  const [isHideUserMenu, setIsHideUserMenu] = useState(true);

  const toggleSidebar = () => setIsFullSidebar((prevState) => !prevState);
  const toggleHideMenu = () => setIsHideUserMenu((prevState) => !prevState);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsFullSidebar(false);
    }
  }, []);

  const hideUserMenu = () => {
    if (!isHideUserMenu) {
      setIsHideUserMenu(true);
    }
  };

  return (
    <div
      onClick={hideUserMenu}
      className={tailwindMerge(
        "tw-relative tw-flex tw-bg-gray-50 tw-w-full tw-justify-between"
      )}
    >
      {isFullSidebar && (
        <div
          onClick={toggleSidebar}
          className="tw-block tw-absolute tw-bg-black tw-w-full tw-h-full tw-z-40 tw-bg-opacity-50 md:tw-hidden"
        />
      )}
      <Sidebar
        isHoverChildren={isHoverChildren}
        onBurgerClick={toggleSidebar}
        isFullSidebar={isFullSidebar}
        onMouseEnterMenuItem={() => setIsHoverChildren(true)}
        onMouseLeaveMenuItem={() => setIsHoverChildren(false)}
      />
      <ContainerLayout
        isFullSidebar={isFullSidebar}
        isHoverChildren={isHoverChildren}
      >
        <>
          <Header
            onToggleModal={toggleHideMenu}
            onBurgerClick={toggleSidebar}
            isHideUserMenu={isHideUserMenu}
          />
          <div className="tw-bg-background tw-relative tw-max-h-[calc(100vh-72px)] tw-overflow-y-auto">
            {children}
          </div>
        </>
      </ContainerLayout>
    </div>
  );
};

export default DashboardLayout;
