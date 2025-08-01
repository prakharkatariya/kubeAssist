export class SessionStorage {
  storage = window.sessionStorage;

  getItem = key => this.storage.getItem(key);

  setItem = (key, value) => this.storage.setItem(key, value);

  removeItem = key => this.storage.removeItem(key);

  key = index => this.key(index);

  get length() {
    return this.storage.length;
  }
}
