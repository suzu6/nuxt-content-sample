<template>
  <div>
    <div v-for="n in posts" :key="n.slug">
      <nuxt-link :to="'/posts/' + n.slug"
        >{{ n.title }} {{ n.updated_at }}</nuxt-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { IContentDocument } from '@nuxt/content/types/content'
import Vue from 'vue'

export default Vue.extend({
  name: 'LatestPosts',
  data() {
    return {
      posts: [],
    }
  },
  mounted() {
    this.getLatest()
  },
  methods: {
    async getLatest() {
      const query = await this.$content('posts')
        .only(['title', 'slug', 'updated_at'])
        .sortBy('updated_at', 'asc')
        .limit(15)

      query.fetch().then((responce) => {
        if (!Array.isArray(responce)) {
          responce = new Array<IContentDocument>(responce)
        }
        this.posts = responce as []
      })
    },
  },
})
</script>
