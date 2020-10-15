class Attributes<T> {
  constructor(private data: T) {
    this.data = data;
  }

  get = <K extends keyof T>(key: K): T[K] => this.data[key]

  set = (update: T): void => {
    Object.assign(this.data, update);
  }
}

export default Attributes;
