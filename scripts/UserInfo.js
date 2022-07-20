// export default class UserInfo {
//   constructor({ userName, userJob }) {
//     this._userName = userName;
//     this._userJob = userJob;
//   }

//   getUserInfo() {
//     this._userInfo = {
//       formName: this._userName.textContent,
//       formJob: this._userName.textContent
//     }
//     return this._userInfo;
//   }

//   setUserInfo(item) {
//     this._userName.textContent = item.formName;
//     this._userJob.textContent = item.formName;
//   }
// }

export default class UserInfo {
  constructor({ userNameClass, userJobClass }) {
    this._userName = document.querySelector(userNameClass);
    this._userJob = document.querySelector(userJobClass);
  }

  getUserInfo() {
    this._userInfo = {
      formName: this._userName.textContent,
      formJob: this._userJob.textContent
    }
    return this._userInfo;
  }

  setUserInfo(item) {
    this._userName.textContent = item.formName;
    this._userJob.textContent = item.formJob;
  }
}
