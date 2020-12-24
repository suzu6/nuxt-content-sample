<template>
  <div class="container">
    <div>
      <PostsLinks :limit="limit" :tag="tag" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import PostsLinks from '@/components/PostsLinks.vue'
import Tag from '@/Domains/Models/Tag'

export default Vue.extend({
  name: 'Tags',
  components: {
    PostsLinks,
  },
  fetch() {
    this.tag = this.$route.params.slug
  },
  data() {
    return {
      limit: 100,
      tag: 'all',
    }
  },
})
</script>
