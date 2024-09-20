export interface FeatureName {
  icon: React.ReactNode;
  text: string;
  fn: Function;
  path?: string;
}

export const enum RoleId {
  ADMIN = "admin",
  MANAGE = "manage",
  USER = "user",
}
