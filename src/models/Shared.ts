export type ApiConfiguration = {
  basePath: string;
  authorisationHeader: string;
};

export type ItemsResponse<T> = {
  Items: T[];
  TotalRecordCount: number;
  StartIndex: number;
};
