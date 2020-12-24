import Tag from "@/Domains/Models/Tag"
import { IContentDocument } from "@nuxt/content/types/content";

class Post{
  id: number;
  slug: string;
  title: string;
  private _updatedAt: Date;
  private _createdAt: Date;
  tags: Tag[];
  icon: string;
  document?: IContentDocument;

  constructor(){
    this.id = 0;
    this.slug = 'slug';
    this.title = 'now loading...';
    this._updatedAt = new Date();
    this._createdAt = new Date();
    this.tags = [];
    this.icon = '/icons/snake.svg';
  }

  setPost(
    id: number,
    slug: string,
    title: string,
    updatedAt: Date,
    createdAt: Date,
    tags: string,
    icon: string,
    document: IContentDocument
  ){
    this.id = id;
    this.slug = slug;
    this.title = title;
    this._updatedAt = updatedAt;
    this._createdAt = createdAt;
    this.tags = this.setTag(tags);
    this.icon = icon;
    this.document = document;
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

export default Post;