import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Path, useLocation, useNavigate } from "react-router-dom";
import { setSidebar } from "@redux/dashboard/dashboardReduxReducer";
import { selectSidebar } from "@redux/dashboard/dashboardReduxSelector";
import MappingIcon from "./MappingIcon";
import ArrowDownIcon from "@components/icon/ArrowDownIcon";
import IMenuItemType from "./MenuItem.interface";

import "./MenuItem.style.css";

const MenuItem = ({
  isActive,
  name,
  isHasChild,
  child,
  iconType,
  link,
  menuId,
  pathName,
  isFullSidebar,
  isHoverChildren,
  isShowChild,
}: IMenuItemType): JSX.Element => {
  const navigate = useNavigate();
  const listMenu = useSelector(selectSidebar);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const indexChosen = listMenu.findIndex(
      (res) => res.url === location.pathname.split("/")[1]
    );
    swapMenu(indexChosen, true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickLink = () => {
    if (isHasChild) {
      const indexChosen = listMenu.findIndex((res) => res.menuId === menuId);
      swapMenu(indexChosen);
    } else {
      navigate(link, { replace: false, state: { refreshed: true } });
    }
  };

  const swapMenu = (indexChosen: number, status?: boolean) => {
    if (indexChosen >= 0) {
      const tempMenu: any = [...listMenu];
      tempMenu[indexChosen] = {
        ...tempMenu[indexChosen],
        isShowChild: status
          ? true
          : tempMenu[indexChosen].isShowChild
          ? false
          : true,
      };
      dispatch(setSidebar(tempMenu));
    }
  };

  const onNavigate = (link: string | Partial<Path>) => {
    navigate(link + "?refresh=" + new Date().getTime(), {
      replace: false,
      flushSync: true,
    });
  };

  return (
    <li
      className={`
        menu-item
        tw-ease-in
        tw-duration-100
        tw-select-none
        ${isActive && "active"}
      `}
    >
      <div
        onClick={onClickLink}
        className={`
          sidebar-link
          tw-z-30
          ${isShowChild && "sidebar-link-active"}
        `}
      >
        <div
          className={`
          tw-w-full
          tw-flex
          tw-items-center
          tw-justify-between
          tw-gap-x-3
        `}
        >
          <MappingIcon iconType={iconType} />
          <div
            className={`
            tw-flex
            tw-items-center
            tw-justify-between
            tw-w-full
          `}
          >
            <span
              className={`
                sidebar-text 
                ${
                  isFullSidebar
                    ? "sidebar-child-show"
                    : isHoverChildren
                    ? "sidebar-child-show"
                    : "sidebar-child-hide"
                }
              `}
            >
              {name}
            </span>
            {isHasChild && (
              <ArrowDownIcon
                className={`tw-ease-in tw-duration-100 tw-w-3 tw-text-secondary-800 ${
                  isShowChild ? "tw-rotate-0" : "tw--rotate-90"
                } ${
                  isFullSidebar
                    ? "sidebar-child-show"
                    : isHoverChildren
                    ? "sidebar-child-show"
                    : "sidebar-child-hide"
                }`}
                width={15}
                height={15}
              />
            )}
          </div>
        </div>
      </div>
      {isShowChild && (isFullSidebar || isHoverChildren) && (
        <div
          className={`
            children-parent
            tw-z-20
            ${
              isFullSidebar
                ? "sidebar-child-show"
                : isHoverChildren
                ? "sidebar-child-show"
                : "sidebar-child-hide"
            }
          `}
        >
          {child?.map((res: any, index: number) => {
            return (
              <div
                key={index}
                onClick={() => onNavigate(res.url)}
                className={`
                  children-container
                  tw-z-10
                  ${res.url === pathName && "active"}`}
              >
                <p className="tw-font-semibold tw-text-xs">{res.menuName}</p>
              </div>
            );
          })}
        </div>
      )}
    </li>
  );
};

export default MenuItem;
