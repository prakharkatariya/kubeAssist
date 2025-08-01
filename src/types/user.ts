export type User = {
  id?: any;
  domainID: string;
  email: string;
  displayName?: string;
  firstname?: string;
  lastname?: string;
  role: string;
  lastActive: any;
  createdAt?: string;
  updatedAt?: string;
  status: string;
  groups?: any;
  createdBy?: string;
  lastUpdatedBy?: string;
};

export type UserSession = {
  id?: any;
  refresh_token: string;
  session_id: string;
  access_token: string | null;
  domainID: string;
  session_status: string;
  loginTimestamp: string;
  logoutTimestamp?: string;
};
