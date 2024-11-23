import { IResponseEntity } from "./ResponseEntity";

interface IInsight {
  value: string;
  title: string;
}

interface IInsightStyle {
  color: string;
  icon: string;
  bgIcon: string;
}

export interface IInsightsState {
  isLoading: boolean;
  data: {
    daily_count: (IInsight & IInsightStyle)[];
    monthly_count: (IInsight & IInsightStyle)[];
  };
}

export type InsightFilter = "daily_count" | "monthly_count";

export interface IInsightData {
  daily_count: IInsight[];
  monthly_count: IInsight[];
}

export interface IInsightResponse extends IResponseEntity<IInsightData> {}
