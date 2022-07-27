export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, this._headers)
      .then(res => {
        if(res.ok) {
          return res.json();
        }
      });
  }

  getUserProfile() {
    return fetch(`${this._url}/users/me`, this._headers)
      .then(res => {
        if(res.ok) {
          return res.json();
        }
      });
  }
}
