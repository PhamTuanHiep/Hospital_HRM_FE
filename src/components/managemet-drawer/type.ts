export interface FeatureName {
  icon: React.ReactNode;
  text: string;
  fn: Function;
}

export const enum RoleId {
  ADMIN = "admin",
  MANAGE = "manage",
  USER = "user",
}
