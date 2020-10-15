import Unit from '@/models/Unit';


class Children extends Unit {
  constructor(public label: string, public children: Unit[], public state?: string) {
    super();

    this.label = label;

    this.children = children;

    this.state = state;
  }
}

export default Children;
