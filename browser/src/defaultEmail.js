class ContactEmailChanged {
  constructor() {
    this.isChanged=true;
  }

  touched() {
    this.isChanged=true;
  }

  noTouching() {
    this.isChanged=false;
  }

  isTouched() {
    return this.isChanged;
  }
}

export default new ContactEmailChanged();
