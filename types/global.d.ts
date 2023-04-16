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

export type TRoleData = {
  classJobId: number;
  classJobName: string;
  classJobLevel: number;
  classJobCode: string;
}

export type TRoleAccordionProps = {
  roleId: number;
  roleType: string;
  bg: string;
  hover: string;
  roleData: Array<TRoleData>;
};


export type TDungeonList = {
  id: number;
  name: string;
  class_job_level_required: number;
  item_level_required: number;
  url: string;
  content_type_id: number;
  accept_class_job_category: any;
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
  results: Array<TDungeonList>;
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

export type TCharacter = {
  Avatar: string;
  FeastMatches: number;
  ID: number;
  Lang: string;
  Name: string;
  Rank: number | null;
  RankIcon: string | null;
  Server: string;
};
