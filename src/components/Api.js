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
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      name: data.formName,
      about: data.formJob
    })
  })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка Api: ${res.status}`);
    })
  }

  addNewCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка Api: ${res.status}`);
      });
  }
}
