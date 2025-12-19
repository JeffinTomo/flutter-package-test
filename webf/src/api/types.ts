export interface ActivityItem {
  'activity-id': string;
  logo: string;
  title: string;
  tx_time: string;
  status: string;
  points: number;
}

export interface MyPointsResponse {
  code: number;
  data: {
    points: number;
    list: ActivityItem[];
    total: number;
    pageSize: number;
    pageNumber: number;
  };
}

export interface ActivitiesResponse {
  code: number;
  data: {
    list: ActivityItem[];
    total: number;
    pageSize: number;
    pageNumber: number;
  };
}

