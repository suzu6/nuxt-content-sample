import { IContentDocument } from '@nuxt/content/types/content';
import Tag from "@/Domains/Models/Tag"

class TagService {
  tags: Tag[];
  constructor() {
    this.tags = []
  }

  setTags(
    content: IContentDocument | IContentDocument[]
  ) {
    if (!Array.isArray(content)) {
      content = new Array<IContentDocument>(content);
    }
    const array = this.toArray(content);
    this.tags = this.count(array);
  }

  getTags(): Tag[] {
    return this.tags;
  }

  private count(array: string[]): Tag[] {
    let tags: Tag[] = [];
    const set = new Set(array);
    var count: { [key: string]: number; } = {};
    for (const tag of array) {
      count[tag] = (count[tag]) ? count[tag] + 1 : 1;
    }
    for (const tag of set) {
      tags.push(new Tag(tag, count[tag]));
    }
    tags = tags.sort((a: Tag, b: Tag) => {
        if( a.name < b.name ) return -1;
        if( a.name > b.name ) return 1;
        return 0;
    });
    return tags;
  }

  private toArray(src: Array<IContentDocument>): string[] {
    let array: string[] = [];
    for (const item of src) {
      array = array.concat(item.tags.split(','));
    }
    return array;
  }
}
export default TagService;