import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AccountDetail } from "../../../common/common.type";
import { INIT_ACCOUNT } from "../../../common/common.constant";

export interface AccountState {
  account: AccountDetail;
  isAuth: boolean;
}
const initialState: AccountState = {
  account: INIT_ACCOUNT,
  isAuth: false,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    doLogin: (state, action: PayloadAction<AccountDetail>) => {
      state.account = action.payload;
      state.isAuth = true;
    },
    doLogout: (state, action: PayloadAction<AccountDetail>) => {
      console.log("action:", action);
      state.account = initialState.account;
      state.isAuth = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { doLogin, doLogout } = accountSlice.actions;
// console.log("accountSlice.actions:", accountSlice.actions);
// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value
export default accountSlice.reducer;
