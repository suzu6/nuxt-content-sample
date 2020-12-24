import { IContentDocument } from '@nuxt/content/types/content';
import Post from "@/Domains/Models/Post"
import { QueryBuilder } from '@nuxt/content/types/query-builder';

class PostService {
  post: Post;
  constructor() {
    this.post = new Post();
  }

  setPost(
    content: IContentDocument | IContentDocument[]
  ) {
    if (Array.isArray(content)) {
      content = content[0];
    }

    this.post.setPost(
      content.id,
      content.slug,
      content.title,
      content.updated_at,
      content.created_at,
      content.tags,
      content.top_image,
      content
    )
  }
}
export default PostService;