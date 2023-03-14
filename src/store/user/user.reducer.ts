
import { UserData } from "../../utils/firebase/firebse.utils";
import { AnyAction } from 'redux';
import { signInSuccess, googleSignInStart, signUpStart, signOutStart, checkUserSession, emailSignInStart, signInFailed, signUpFailed, signOutFailed, signOutSuccess } from "./user.action";
export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
}
export const USER_INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = USER_INITIAL_STATE, action: AnyAction) => {

  if (signInSuccess.match(action)) {
    return {
      ...state,
      currentUser: action.payload,
      isLoading: false,
    };
  }
  if (googleSignInStart.match(action) || signOutStart.match(action) || checkUserSession.match(action) || emailSignInStart.match(action) || signUpStart.match(action)) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (signInFailed.match(action) || signUpFailed.match(action) || signOutFailed.match(action)) {
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    }
  }
  if (signOutSuccess.match(action)) {
    return {
      ...state,
      isLoading: false,
      currentUser: null,
    };
  }

  return state;
  // switch (type) {
  //   case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
  //     return {
  //       ...state,
  //       currentUser: payload,
  //       isLoading: false,
  //     };
  //   case USER_ACTION_TYPES.SET_CURRENT_USER:
  //     return {
  //       ...state,
  //       currentUser: payload,
  //       isLoading: false,
  //     };
  //   case USER_ACTION_TYPES.GOOGLE_SIGNIN_START:
  //   case USER_ACTION_TYPES.SIGN_UP_START:
  //   case USER_ACTION_TYPES.CHECK_USER_SESSION_START:
  //   case USER_ACTION_TYPES.EMAIL_SIGNIN_START:
  //   case USER_ACTION_TYPES.SIGN_OUT_START:
  //     return {
  //       ...state,
  //       isLoading: true,
  //     };

  //   case USER_ACTION_TYPES.SIGN_IN_FAILED:
  //   case USER_ACTION_TYPES.SIGN_UP_FAILED:
  //     return {
  //       ...state,
  //       error: payload,
  //       isLoading: false,
  //     };
  //   case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
  //     return {
  //       ...state,
  //       isLoading: false,
  //       currentUser: null,
  //     };
  //   case USER_ACTION_TYPES.SIGN_OUT_FAILED:
  //     return {
  //       ...state,
  //       isLoading: false,
  //       error: payload,
  //     };
  //   default:
  //     return state;
  // }
};
