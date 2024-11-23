import { IInsightData } from "@domain/entities/InsightEntity";

class InsightMapper {
  static toPresentation(domain: IInsightData) {
    const styles = [
      {
        color: "tw-bg-[#FFE2E5]",
        icon: "cert",
        bgIcon: "tw-bg-red-400",
      },
      {
        color: "tw-bg-[#FFF4DE]",
        icon: "memo",
        bgIcon: "tw-bg-yellow-400",
      },
      {
        color: "tw-bg-[#F3E8FF]",
        icon: "memo",
        bgIcon: "tw-bg-purple-400",
      },
    ];

    return {
      ...domain,
      daily_count: domain.daily_count
        ?.sort((a, b) => b.title.localeCompare(a.title))
        .map((item, index) => ({
          ...item,
          ...styles[index],
        })),
      monthly_count: domain.monthly_count
        ?.sort((a, b) => b.title.localeCompare(a.title))
        .map((item, index) => ({
          ...item,
          ...styles[index],
        })),
    };
  }
}

export default InsightMapper;
