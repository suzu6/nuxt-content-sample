<template>
  <div class="container">
    <div>
      <PostsLinks :limit="limit" :tag="tag" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PostsLinks from '@/components/PostsLinks.vue'

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
