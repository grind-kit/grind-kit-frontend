export type TRoleAccordionProps = {
  id: number;
  type: string;
  bg: string;
  hover: string;
  data: Array<{
    id: number;
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

type TDungeonListProps = {
  results: Array<TDungeonList>;
  jobCode: string | string[] | undefined;
};

type TDungeonId = {
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
