import { takeLatest, put, call, all } from "typed-redux-saga/macro";

import { USER_ACTION_TYPES } from "./user.types";

import { User } from 'firebase/auth'



import {
  signInSuccess,
  signInFailed,
  signUpFailed,
  signUpSuccess,
  signOutSuccess,
  signOutFailed,
  EmailSignInStart,
  SignUpStart,
  SignUpSuccess
} from "./user.action";

import {
  getCurrentUser,
  cerateUserDocumentFromAuth,
  signInWithGooglePopup,
  signInWithGoogleEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  googleSignOut,
  AdditionalData
} from "../../utils/firebase/firebse.utils";

export function* getSnapShortFromUserAuth(userAuth: User, additionalData?: AdditionalData) {
  try {
    const userSnapShot = yield* call(
      cerateUserDocumentFromAuth,
      userAuth,
      additionalData
    );
    if (userSnapShot)
      yield* put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapShortFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}
export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapShortFromUserAuth, user);
    yield* call(getSnapShortFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}
export function* signInWithEmail({ payload: { email, password } }: EmailSignInStart) {
  try {
    const userCredential = yield* call(signInWithGoogleEmailAndPassword, email, password);
    if (userCredential) {
      const { user } = userCredential;
      yield* call(getSnapShortFromUserAuth, user);
    }
  } catch (error ) {
    yield* put(signInFailed(error as Error));
  }
}
export function* signUp({ payload: { email, password, displayName } }: SignUpStart) {
  try {
    const userCredential = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    if(userCredential) {
      const { user } = userCredential;
      yield* put(signUpSuccess(user, { displayName }));
    }
    
    
  } catch (error) {
    yield* put(signUpFailed(error as Error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }: SignUpSuccess) {
  try {
    yield* call(getSnapShortFromUserAuth, user, additionalDetails);
  } catch (error) {
    yield* put(signUpFailed);
  }
}

export function* signOut() {

  try {
    yield* call(googleSignOut);
    yield* put(signOutSuccess());
  } catch (error) {
    yield* put(signOutFailed(error as Error));
  }
}
export function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGNIN_START, signInWithGoogle);
}
export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}
export function* onEmailSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGNIN_START, signInWithEmail);
}
export function* onSignUpStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}
export function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}
export function* onSignOutStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}
export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart)
  ]);
}
