import { createSelector } from "reselect";
import { UserState } from "./user.reducer";
import { RootState } from "../store";
const selectUserReducer = (state: RootState): UserState => {
  
  return state.user;
  
};

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (userSlice) => {
    return userSlice.currentUser;
  }
);

//export const selectCurrentUser = (state)=>state.user.currentUser;
