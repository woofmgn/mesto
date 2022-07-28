export default class UserInfo {
  constructor({ userNameClass, userJobClass, avatar }) {
    this._userName = document.querySelector(userNameClass);
    this._userJob = document.querySelector(userJobClass);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    this._userInfo = {
      formName: this._userName.textContent,
      formJob: this._userJob.textContent
    }
    return this._userInfo;
  }

  // setUserInfo(item) {
  //   this._userName.textContent = item.formName;
  //   this._userJob.textContent = item.formJob;
  // }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userJob.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}
