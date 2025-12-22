import { ISuggestionModalState } from "@domain/entities/SuggestionEntity";

export type UpgradeType = "sertifikat" | "m1";

const APIEndpoints = {
  menu: {
    accessMenu: "dashboard/v1/access/menu",
    management: "dashboard/v1/menu",
    managementList: "dashboard/v1/menu/list",
    managementParent: "dashboard/v1/menu/parents",
  },
  auth: {
    login: "api/login",
    profile: "api/profile",
  },
  master: {
    base: "api/masters",
    find: "api/masters/search",
    detail: "api/masters/detail",
    delete: "api/masters/delete",
    trash: "api/masters/thrash",
    "trash/restore": "api/masters/thrash/restore",
    "trash/destroy": "api/masters/thrash/destroy",
    print: "api/masters/print",
    upgrade: (type: UpgradeType) => `api/masters/upgrade/${type}`,
  },
  members: "api/members",
  suggestions: {
    all: "api/suggestion/all",
    create: (type: ISuggestionModalState["type"]) => `api/suggestion/${type}`,
    delete: (name: string | number, type: ISuggestionModalState["type"]) =>
      `api/suggestion/${type}/${name}`,
  },
  insight: "api/insight",
  insightTopMembers: "api/insight/top-members",
};

export default APIEndpoints;
