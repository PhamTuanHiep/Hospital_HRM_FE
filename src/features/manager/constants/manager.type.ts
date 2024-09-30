import { ReactNode } from "react";

export interface AccountsData {
  key: React.Key;
  email: string;
  password: string;
  roleName: string;
  userName: string;
  createdByName: string;
  updatedByName: string;
  actions: string | ReactNode;
}
