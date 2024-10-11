export interface AccountLogin {
  email: string;
  password: string;
}

export interface LoginSubmit {
  account: AccountLogin;
}
