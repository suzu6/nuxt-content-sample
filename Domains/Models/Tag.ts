
class Tag {
  name: string;
  count: number;

  constructor(
    name: string,
    count = 1
  ){
    this.name = name;
    this.count = count;     
  }
}
export default Tag;