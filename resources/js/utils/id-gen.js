class IdGen {
  constructor() {
    this.id = 0;
  }

  get() {
    this.id += 1;
    return 'id-' + this.id.toString();
  }
}

module.exports = IdGen;
