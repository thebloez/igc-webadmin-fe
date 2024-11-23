import { Select } from "antd";
import { useLanguage } from "@lib/hooks/useLanguage";
import { useEffect, useState } from "react";
import dashboardFilters from "@lib/utils/dashboardFilters";
import { IInsightsState } from "@domain/entities/InsightEntity";
import { useDispatch, useSelector } from "react-redux";
import { setUserToken } from "@redux/user/userReduxReducer";
import useInsightViewModel from "@lib/hooks/useInsightViewModel";
import { selectToken } from "@redux/user/userReduxSelector";
import StatCard from "@components/insight/StatCard";
import InsightLoading from "@components/insight/InsightLoading";

const DashboardPage = () => {
  const { t } = useLanguage();

  const dispatch = useDispatch();
  const clearToken = () => dispatch(setUserToken(""));
  const token = useSelector(selectToken);

  const [state, setState] = useState<IInsightsState>({
    data: [] as any,
    isLoading: true,
    type: "daily_count",
  });

  const insightViewModel = useInsightViewModel({
    clearToken,
    setState,
    token,
  });
  // state filter
  const [filter, setFilter] = useState("daily_count");

  const handleChangeFilter = (value: string) => {
    setFilter(value);
  };

  useEffect(() => {
    getInsight();
  }, [filter]);

  const getInsight = async () => {
    await insightViewModel.getInsight();
  };

  return (
    <div className="tw-m-0 tw-p-6">
      <div className="tw-flex tw-flex-col tw-gap-4 tw-w-full">
        <div className="tw-flex tw-justify-between tw-w-full tw-gap-4">
          <div className="tw-w-full tw-bg-white tw-p-4 tw-rounded-md tw-shadow tw-overflow-hidden">
            <div className="tw-mb-4 tw-flex tw-justify-between tw-items-start tw-gap-2">
              <div>
                <p className="tw-text-xl tw-font-semibold">
                  {t("dashboard.title")}
                </p>
                <p>{t("dashboard.description")}</p>
              </div>

              <Select
                suffixIcon
                value={filter}
                className="tw-w-[200px]"
                options={dashboardFilters}
                onChange={handleChangeFilter}
              />
            </div>

            {/* Summary Cards */}
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4 tw-mb-2">
              {state.isLoading ? (
                <InsightLoading />
              ) : (
                state.data[state.type]?.map((item, index) => (
                  <StatCard
                    key={index}
                    color={item.color}
                    bgIcon={item.bgIcon}
                    icon={item.icon}
                    value={item.value}
                    title={item.title}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
