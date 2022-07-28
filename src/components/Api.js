export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
    headers: this._headers})
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getUserProfile() {
    return fetch(`${this._url}/users/me`, {
    headers: this._headers})
    .then(res => {
      if(res.ok) {
         return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  setUserProfile(data) {
    return fetch(`${this._url}/users/me`, {
    headers: this._header,
    body: JSON.stringify({
      name: data.name,
      about: data.about
    })
  })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}
