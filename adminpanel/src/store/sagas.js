import { all, fork } from "redux-saga/effects";
//layout
import LayoutSaga from "./layouts/saga";
//Auth
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ProfileSaga from "./auth/profile/saga";

//ecommerce
import ecommerceSaga from "./ecommerce/saga";

//Project
import projectSaga from "./projects/saga";
// Task

// Dashboard Ecommerce
import dashboardEcommerceSaga from "./dashboardEcommerce/saga";


export default function* rootSaga() {
  yield all([
    //public
    fork(LayoutSaga),
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(projectSaga),
    fork(ecommerceSaga),
    fork(dashboardEcommerceSaga),
  ]);
}
