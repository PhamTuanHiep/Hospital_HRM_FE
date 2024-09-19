import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store";

export interface Account {
  accountId: number;
  email: string;
  password: string;
  roleId: string;
  userId: number;
}

export interface AccountState {
  account: Account;
  isAuthen: boolean;
}
const initialState: AccountState = {
  account: {
    accountId: 0,
    email: "",
    password: "",
    roleId: "",
    userId: 0,
  },
  isAuthen: false,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    doLogin: (state, action: PayloadAction<Account>) => {
      state.account = action.payload;
      state.isAuthen = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { doLogin } = accountSlice.actions;
// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value
export default accountSlice.reducer;
