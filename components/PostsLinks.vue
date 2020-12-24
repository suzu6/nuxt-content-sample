<template>
  <section class="latest-posts content is-small">
    <h4 class="subtitle">
      <i class="mdi mdi-new-box" />&nbsp;新着 or 更新記事
    </h4>
    <article
      v-for="item in posts"
      :key="item.slug"
      class="article content border-bottom"
    >
      <PLink
        :title="item.title"
        :slug="item.slug"
        :icon="item.icon"
        :updated-at="item.updatedAt"
        :tags="item.tags"
        :show-tags="showTags"
      />
    </article>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import PostLinkService from '@/app/Services/PostLinkService'
import PLink from '@/components/common/PostLink.vue'

export default Vue.extend({
  name: 'PostsLinks',
  components: {
    PLink,
  },
  props: {
    limit: {
      type: Number,
      default: 15,
      required: false,
    },
    tag: {
      type: String,
      default: 'all',
      required: false,
    },
    page: {
      type: Number,
      default: 1,
      required: false,
    },
    showTags: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  fetch() {
    const offset = (this.page - 1) * this.limit
    this.getLatest(this.limit, offset)
  },
  data() {
    return {
      posts: [],
      postLinkService: new PostLinkService(),
    }
  },
  methods: {
    async getLatest(limit: number, offset: number) {
      let query = this.$content('posts')
        .where({ isDraft: false })
        .only([
          'id',
          'title',
          'slug',
          'updated_at',
          'created_at',
          'top_image',
          'tags',
        ])
        .sortBy('updated_at', 'desc') // 降順
        .skip(offset)

      // 公開では下書きを非表示
      if (process.env.NODE_ENV === 'production') {
        query = query.where({ isDraft: false })
      }

      const responce = await query.fetch()
      this.postLinkService.setPostLinks(responce, this.tag, limit)
      this.posts = this.postLinkService.getPostLinks() as []
    },
  },
})
</script>

<style lang="scss">
.latest-posts {
  text-align: left;
  margin: 2rem 0;
}
</style>
