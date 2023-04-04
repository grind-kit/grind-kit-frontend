export type TClassJob = {
  ClassID: number;
  ExpLevel: number;
  ExpLevelMax: number;
  ExpLevelTogo: number;
  IsSpecialised: boolean;
  JobID: number;
  Level: number;
  Name: string;
  UnlockedState: {
    ID: number;
    Name: string;
  };
};

export type TDashboardProps = {
  lodestoneId: number | null;
  arrayOfClassJobs: Array<TClassJob>;
};

export type TRoleAccordionProps = {
  roleId: number;
  type: string;
  bg: string;
  hover: string;
  data: Array<{
    jobId: number;
    name: string;
    level: number;
    jobCode: string;
  }>;
};

export type TPagination = {
  Page: number;
  PageNext: number | null;
  PagePrev: number | null;
  PageTotal: number;
  Results: number;
  ResultsPerPage: number;
  ResultsTotal: number;
};

export type TDungeonList = {
  ContentFinderCondition: {
    ClassJobLevelRequired: number;
  };
  ID: number;
  InstanceClearExp: number;
  InstanceClearGil: number;
  Name: string;
};

export type TContentListProps = {
  jobCode: string | string[] | undefined;
};

export type TDungeonListProps = {
  results: Array<TDungeonList>;
  jobCode: string | string[] | undefined;
  contentType: string;
};

export type TDungeonListPageProps = {
  initialResults: Array<TDungeonList>;
};

export type TDungeonId = {
  Name: string;
  Description: string;
  Banner: string;
  InstanceClearExp: number;
  InstanceClearGil: number;
  ContentType: {
    IconHD: string;
  };
  ItemLevelRequired: number;
  ContentFinderCondition: {
    ClassJobLevelRequired: number;
  };
};

export type TDungeonIdProps = {
  initialResults: TDungeonId;
};
