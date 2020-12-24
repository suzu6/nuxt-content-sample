import Tag from "@/Domains/Models/Tag"

class PostLink{
  id: number;
  slug: string;
  title: string;
  private _updatedAt: Date;
  private _createdAt: Date;
  tags: Tag[];
  icon: string;

  constructor(
    id: number,
    slug: string,
    title: string,
    updatedAt: Date,
    createdAt: Date,
    tags: string,
    icon: string
  ){
    this.id = id;
    this.slug = slug;
    this.title = title;
    this._updatedAt = updatedAt;
    this._createdAt = createdAt;
    this.tags = this.setTag(tags);
    this.icon = icon;
  }

  private setTag(str: string): Tag[]{
    return str.split(',')
      .map((x)=>{
        return new Tag(x);
      })
  }

  get createdAt(): string{
    return this._createdAt.toString().split('T')[0];
  }

  get updatedAt(): string{
    return this._updatedAt.toString().split('T')[0];
  }
}

export default PostLink;