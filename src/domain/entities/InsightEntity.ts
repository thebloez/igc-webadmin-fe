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

export interface IInsightData {
  daily_count: IInsight[];
  monthly_count: IInsight[];
}

export interface IInsightResponse extends IResponseEntity<IInsightData> {}

export interface IInsightsState {
  isLoading: boolean;
  data: {
    daily_count: (IInsight & IInsightStyle)[];
    monthly_count: (IInsight & IInsightStyle)[];
  };
}

export type InsightFilter = "daily_count" | "monthly_count";

export type TopMemberCategory = "memo_m1" | "memo_m2" | "sertifikat";

export type TopMemberPeriodPreset = "3m" | "6m" | "12m";

export interface ITopMember {
  member_phone_number: string;
  nama: string;
  count: number;
}

export interface ITopMemberPeriod {
  start: string;
  end: string;
  preset: TopMemberPeriodPreset;
}

export interface ITopMembersDomain {
  period: ITopMemberPeriod;
  top_members: Record<TopMemberCategory, ITopMember[]>;
}

export interface ITopMemberGroup {
  key: TopMemberCategory;
  members: ITopMember[];
}

export interface ITopMembersPresentation {
  period: ITopMemberPeriod;
  groups: ITopMemberGroup[];
}

export interface ITopMembersState {
  isLoading: boolean;
  period?: ITopMemberPeriod;
  groups: ITopMemberGroup[];
}

export interface ITopMembersResponse
  extends IResponseEntity<ITopMembersDomain> {}
