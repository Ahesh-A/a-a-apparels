import { createSelector } from "reselect";
import { UserState } from "./user.reducer";
const selectUserReducer = (state: any): UserState => {
  
  return state.user;
  
};

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (userSlice) => {
    return userSlice.currentUser;
  }
);

//export const selectCurrentUser = (state)=>state.user.currentUser;
