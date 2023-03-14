export type TPagination = {
  Page: number;
  PageNext: number | null;
  PagePrev: number | null;
  PageTotal: number;
  Results: number;
  ResultsPerPage: number;
  ResultsTotal: number;
};

export type TInstanceContentResults = {
  ContentFinderCondition: {
    ClassJobLevelRequired: number;
  };
  ID: number;
  InstanceClearExp: number;
  InstanceClearGil: number;
  Name: string;
};
