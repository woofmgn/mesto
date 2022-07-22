export default class Section {
  constructor({ items, renderer }, containerItem) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerItem;
  }

  addItem(element) {
    // const card = this._renderer(item)
    // this._container.prepend(card);
    this._container.prepend(element);
  }

  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    })
  }
}
