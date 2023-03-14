import { takeLatest, put, call, all } from "redux-saga/effects";

import { USER_ACTION_TYPES } from "./user.types";

import {
  signInSuccess,
  signInFailed,
  signUpFailed,
  signUpSuccess,
  
  signOutSuccess,
  signOutFailed,
} from "./user.action";

import {
  getCurrentUser,
  cerateUserDocumentFromAuth,
  signInWithGooglePopup,
  signInWithGoogleEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  googleSignOut,
} from "../../utils/firebase/firebse.utils";

export function* getSnapShortFromUserAuth(userAuth, additionalData) {
  try {
    const userSnapShot = yield call(
      cerateUserDocumentFromAuth,
      userAuth,
      additionalData
    );
    yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapShortFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}
export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapShortFromUserAuth, user);
    yield call(getSnapShortFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}
export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = call(signInWithGoogleEmailAndPassword, email, password);
    yield call(getSnapShortFromUserAuth, user);
  } catch (error) {
    yield call(signInFailed(error));
  }
}
export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield put(signUpFailed(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  try {
    yield call(getSnapShortFromUserAuth, user, additionalData);
  } catch (error) {
    yield put(signUpFailed);
  }
}

export function* signOut() {

  try {
    yield call(googleSignOut);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed());
  }
}
export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGNIN_START, signInWithGoogle);
}
export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}
export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGNIN_START, signInWithEmail);
}
export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
}
export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}
export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}
export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart)
  ]);
}
