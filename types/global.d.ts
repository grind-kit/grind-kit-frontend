export type TRoleAccordionProps = {
  roleId: number;
  type: string;
  bg: string;
  hover: string;
  data: Array<{
    jobId: number;
    name: string;
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
}

export type TDungeonListProps = {
  results: Array<TDungeonList>;
  jobCode: string | string[] | undefined;
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
