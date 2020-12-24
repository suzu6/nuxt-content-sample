<template>
  <article class="article content section-article">
    <section class="header">
      <h1>{{ post.title }}</h1>
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img :src="post.top_image" />
          </figure>
        </div>
        <div class="media-content overflow-x-unset">
          <div class="tags">
            <i class="mdi mdi-tag" />&nbsp;
            <span v-for="tag in post.tags.split(',')" :key="tag">
              <a :href="'/tags/' + tag" class="tag">{{ tag }}</a>
            </span>
          </div>
        </div>
        <div class="media-right">
          <div class="post-meta">
            <i class="mdi mdi-calendar-check" />&nbsp;
            <time v-html="post.created_at.split('T')[0]"></time>
          </div>
          <div v-if="post.created_at !== post.updated_at" class="post-meta">
            <i class="mdi mdi-update" />&nbsp;
            <time v-html="post.updated_at.split('T')[0]"></time>
          </div>
        </div>
      </div>
    </section>
    <NuxtContent :document="post" />
    <PostsLinks :show-tags="false" :limit="10" />
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
import PostsLinks from '@/components/PostsLinks.vue'

export default Vue.extend({
  components: {
    PostsLinks,
  },
  async asyncData({ $content, params }) {
    const slug = params.slug
    let query = $content('posts/' + slug)

    // 公開では下書きを非表示
    if (process.env.NODE_ENV === 'production') {
      query = query.where({ isDraft: false })
    }
    return {
      post: await query.fetch(),
    }
  },
})
</script>

<style lang="scss">
.header {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.section-article {
  h1 {
    padding-top: 4rem;
    padding: 0.5em;
    margin: 1rem 0;
    border-left: solid 10px #007d7a;
    /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.14); */
  }
}
.content h2 {
  margin-top: 2em !important;
}
p {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

table {
  background-color: #fafafa;

  tr:hover {
    background-color: #fff;
  }
}

.icon-link::after {
  content: '#';
}

.line-numbers .number {
  align-items: center;
  background-color: rgba(0, 0, 0, 0) !important;
  border-radius: 290486px;
  display: inline-flex;
  font-size: 1rem !important;
  height: 1em !important;
  justify-content: center;
  margin-right: 0 !important;
  min-width: 1em !important;
  padding: 0.25rem 0.5rem !important;
  text-align: center;
  vertical-align: middle !important;
}

code {
  border-radius: 3px;
  color: #363636;
  font-family: Consolas, 'Courier New', 'メイリオ';
}
/** コードブロックのタグ */
.line-numbers {
  border-radius: 6px;
  .tag:not(body) {
    align-items: center;
    background-color: rgba(0, 0, 0, 0) !important;
    display: inline-flex;
    font-size: 1em;
    height: 2em;
    justify-content: center;
    line-height: 1.5;
    padding-left: 0;
    padding-right: 0.5em;
    white-space: nowrap;
  }
  span::selection,
  code::selection {
    background: rgb(241, 231, 90);
  }
}
.content blockquote {
  border-left: 5px solid #7d7b00;
}

details {
  margin-bottom: 1rem;
  summary {
    font-weight: 600;
  }
}

.nuxt-content-highlight .line-numbers {
  padding-top: 1.5rem;
}
.nuxt-content-highlight .comment {
  color: #44be68;
}
.remark-code-title {
  background: #d9d7e0;
  border-radius: 0px 0px 4px 4px;
  color: #3a3a3a;
  font-size: 0.75rem;
  letter-spacing: 0.075em;
  line-height: 1;
  padding: 0.25rem 0.5rem;
  position: absolute;
  left: 1rem;
  text-align: right;
}

.footnotes li {
  font-size: 0.9rem;
}

.overflow-x-unset {
  overflow-x: unset;
}
</style>
