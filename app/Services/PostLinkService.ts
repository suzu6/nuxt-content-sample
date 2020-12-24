import { IContentDocument } from '@nuxt/content/types/content';
import PostLink from "@/Domains/Models/PostLink"

class PostLinkService {
  links: PostLink[];
  constructor() {
    this.links = []
  }

  setPostLinks(
    content: IContentDocument | IContentDocument[],
    tag: string,
    limit: number
  ) {
    if (!Array.isArray(content)) {
      content = new Array<IContentDocument>(content);
    }

    if(tag != 'all'){
      tag = tag.toLowerCase();
      content = content.filter(x => {
        return x.tags.toLowerCase().includes(tag);
      })
    }
    content = content.slice(0, limit);
    for(const cont of content){
      // tagsの文字列にthis.tagを含むオブジェクトをフィルタリングする。
      
      this.links.push(
        new PostLink(
          cont.id,
          cont.slug,
          cont.title,
          cont.updated_at,
          cont.created_at,
          cont.tags,
          cont.top_image
        )
      );
    }
  }

  getPostLinks(): PostLink[] {
    return this.links;
  }
}
export default PostLinkService;