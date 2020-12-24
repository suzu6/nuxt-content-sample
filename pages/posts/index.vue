<template>
  <div class="container">
    <div>
      <PostsLinks :limit="limit" :show-tags="true" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import PostsLinks from '@/components/PostsLinks.vue'

export default Vue.extend({
  name: 'Posts',
  components: {
    PostsLinks,
  },
  data() {
    return {
      limit: 300,
    }
  },
})
</script>
