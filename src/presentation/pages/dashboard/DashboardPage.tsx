import { Empty, List, Select, Skeleton, Tag } from "antd";
import { useLanguage } from "@lib/hooks/useLanguage";
import { useCallback, useEffect, useMemo, useState } from "react";
import dashboardFilters from "@lib/utils/dashboardFilters";
import {
  IInsightsState,
  ITopMembersState,
  InsightFilter,
  TopMemberPeriodPreset,
} from "@domain/entities/InsightEntity";
import { useDispatch, useSelector } from "react-redux";
import { setUserToken } from "@redux/user/userReduxReducer";
import useInsightViewModel from "@lib/hooks/useInsightViewModel";
import { selectToken } from "@redux/user/userReduxSelector";
import StatCard from "@components/insight/StatCard";
import InsightLoading from "@components/insight/InsightLoading";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

const DashboardPage = () => {
  const { t } = useLanguage();

  const dispatch = useDispatch();
  const clearToken = useCallback(() => dispatch(setUserToken("")), [dispatch]);
  const token = useSelector(selectToken);

  const [state, setState] = useState<IInsightsState>({
    data: [] as any,
    isLoading: true,
  });
  const [topMembers, setTopMembers] = useState<ITopMembersState>({
    groups: [],
    isLoading: true,
  });

  const insightViewModel = useInsightViewModel({
    clearToken,
    setState,
    token,
  });
  // state filter
  const [filter, setFilter] = useState<InsightFilter>("daily_count");
  const [topMemberPeriod, setTopMemberPeriod] =
    useState<TopMemberPeriodPreset>("3m");

  const handleChangeFilter = (value: InsightFilter) => {
    setFilter(value);
  };

  const handleChangeTopMemberPeriod = (value: TopMemberPeriodPreset) => {
    setTopMemberPeriod(value);
  };

  const topMemberOptions = useMemo(
    () => [
      {
        label: t("dashboard.top_members.filters.3m"),
        value: "3m",
      },
      {
        label: t("dashboard.top_members.filters.6m"),
        value: "6m",
      },
      {
        label: t("dashboard.top_members.filters.12m"),
        value: "12m",
      },
    ],
    [t]
  );

  const getInsight = useCallback(async () => {
    await insightViewModel.getInsight();
  }, [insightViewModel]);

  const getTopMembers = useCallback(async () => {
    await insightViewModel.getTopMembers(setTopMembers, topMemberPeriod);
  }, [insightViewModel, topMemberPeriod]);

  useEffect(() => {
    getInsight();
  }, [filter, getInsight]);

  useEffect(() => {
    getTopMembers();
  }, [getTopMembers]);

  const formatDate = (value?: string) => {
    if (!value) return "-";

    return format(new Date(value), "dd MMM yyyy", { locale: localeId });
  };

  return (
    <div className="tw-m-0 tw-p-6">
      <div className="tw-flex tw-flex-col tw-gap-4 tw-w-full">
        <div className="tw-flex tw-justify-between tw-w-full tw-gap-4">
          <div className="tw-w-full tw-bg-white tw-p-4 tw-rounded-md tw-shadow tw-overflow-hidden">
            <div className="tw-mb-4 tw-flex tw-flex-col md:tw-flex-row tw-items-start md:tw-items-center tw-justify-between tw-gap-3">
              <div className="tw-space-y-1">
                <p className="tw-text-lg md:tw-text-xl tw-font-semibold">
                  {t("dashboard.title")}
                </p>
                <p className="tw-text-sm tw-text-gray-600">
                  {t("dashboard.description")}
                </p>
              </div>

              <Select
                suffixIcon
                value={filter}
                className="tw-w-full md:tw-w-[220px]"
                options={dashboardFilters}
                onChange={handleChangeFilter}
              />
            </div>

            {/* Summary Cards */}
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4 tw-mb-2">
              {state.isLoading ? (
                <InsightLoading />
              ) : (
                state.data[filter]?.map((item, index) => (
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
        <div className="tw-w-full tw-bg-white tw-p-4 tw-rounded-md tw-shadow tw-overflow-hidden">
          <div className="tw-mb-4 tw-flex tw-flex-col md:tw-flex-row tw-items-start md:tw-items-center tw-justify-between tw-gap-3">
            <div className="tw-space-y-1">
              <p className="tw-text-lg md:tw-text-xl tw-font-semibold">
                {t("dashboard.top_members.title")}
              </p>
              <p className="tw-text-sm tw-text-gray-600">
                {topMembers.period
                  ? `${t("dashboard.top_members.period_label")} ${formatDate(
                      topMembers.period.start
                    )} - ${formatDate(topMembers.period.end)}`
                  : t("dashboard.top_members.description")}
              </p>
            </div>

            <Select
              suffixIcon
              value={topMemberPeriod}
              className="tw-w-full md:tw-w-[220px]"
              options={topMemberOptions}
              onChange={handleChangeTopMemberPeriod}
            />
          </div>

          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4">
            {topMembers.isLoading
              ? [1, 2, 3].map((placeholder) => (
                  <div
                    key={placeholder}
                    className="tw-border tw-border-gray-100 tw-rounded-lg tw-p-3 tw-shadow-sm"
                  >
                    <p className="tw-font-semibold tw-mb-2">
                      {t("dashboard.top_members.title")}
                    </p>
                    <Skeleton active paragraph={{ rows: 4 }} title={false} />
                  </div>
                ))
              : topMembers.groups.map((group) => (
                  <div
                    key={group.key}
                    className="tw-border tw-border-gray-100 tw-rounded-lg tw-p-3 tw-shadow-sm"
                  >
                    <p className="tw-font-semibold tw-mb-2">
                      {t(`dashboard.top_members.categories.${group.key}`)}
                    </p>

                    {group.members.length ? (
                      <List
                        dataSource={group.members}
                        renderItem={(item, memberIndex) => (
                          <List.Item>
                            <div className="tw-flex tw-items-center tw-justify-between tw-w-full">
                              <div className="tw-flex tw-items-center tw-gap-3 tw-text-sm">
                                <span className="tw-font-semibold tw-text-base">
                                  {memberIndex + 1}.
                                </span>
                                <div>
                                  <p className="tw-font-semibold tw-m-0">
                                    {item.nama}
                                  </p>
                                  <p className="tw-text-xs tw-text-gray-500 tw-m-0">
                                    {item.member_phone_number}
                                  </p>
                                </div>
                              </div>
                              <Tag
                                color="blue"
                                className="tw-text-xs tw-px-2 tw-py-1 tw-rounded-full"
                              >
                                {item.count}
                              </Tag>
                            </div>
                          </List.Item>
                        )}
                      />
                    ) : (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={t("dashboard.top_members.empty")}
                      />
                    )}
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
