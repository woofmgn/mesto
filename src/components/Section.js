export default class Section {
  constructor({ renderer }, containerItem) {
    this._renderer = renderer;
    this._container = containerItem;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(cards) {
    this._cards = cards;
    this._cards.forEach(item => {
      this._renderer(item);
    })
  }
}
