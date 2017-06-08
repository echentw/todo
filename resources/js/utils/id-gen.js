class IdGen {
  constructor(prefix, start) {
    this.prefix = prefix;
    this.counter = start;
  }

  get() {
    this.counter += 1;
    return this.prefix + this.counter.toString();
  }
}

module.exports = IdGen;
