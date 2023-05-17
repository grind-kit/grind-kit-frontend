export interface IGetServerSidePropsContext<
  Q extends ParsedUrlQuery = ParsedUrlQuery
> {
  req: IncomingMessage & { cookies: Record<string, string> };
  res: ServerResponse;
  query: Q;
  resolvedUrl: string;
}

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
};

export type TRoleAccordionProps = {
  roleId: number;
  roleType: string;
  bg: string;
  hover: string;
  roleData: Array<TRoleData>;
};

export type TInstanceContentTypeListProps = {
  instanceContentId: number;
  instanceContentType: string;
  contentTypeId: number;
  // Query
  classJobCode: string | string[] | undefined;
};

export type TContentFinderCondition = {
  id: number;
  name: string;
  classJobLevelRequired: number;
  itemLevelRequired: number;
  url: string;
  contentTypeId: number;
  acceptClassJobCategory: JSON;
};

export type TContentSorterProps = {
  arrayOfContentFinderConditions: Array<TContentFinderCondition> | null;
  instanceContentType: string;
};

export type TInstanceContentResultsListProps = {
  contentFinderCondition: TContentFinderCondition;
  instanceContentType: string;
};

export type TInstanceContentPageProps = {
  arrayOfContentFinderConditions: Array<TContentFinderCondition>;
  instanceContentTypeHeader: string;
  instanceContentType: string;
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

export type TBookmarkData = {
  user: number,
  content_finder_condition: number,
  content_type_id: number,
  value: number,
  created: string,
}

export type TIdPage = {
  id: number;
  typeId: number;
  typeName: string;
  typeIcon: string;
  name: string;
  description: string;
  banner: string;
  classJobLevel: number;
  itemLevel: number;
  regionIcon: string;
  regionName: string;
};
