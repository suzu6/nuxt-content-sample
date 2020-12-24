<template>
  <div class="media">
    <div class="media-left">
      <figure class="image is-32x32">
        <img :src="icon" />
      </figure>
    </div>
    <div class="media-content overflow-x-unset">
      <div class="content mb-0">
        <h3 class="mb-0">
          <a :href="'/posts/' + slug">{{ title }}</a>
        </h3>
        <i class="mdi mdi-calendar-check" />&nbsp;
        <time v-html="updatedAt"></time>
      </div>
      <div v-if="showTags" class="tags">
        <i class="mdi mdi-tag" />&nbsp;
        <span v-for="tag in tags" :key="tag.name">
          <a :href="'/tags/' + tag.name" class="tag">{{ tag.name }}</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'PostLink',
  props: {
    title: {
      type: String,
      default: 'now loading....',
      required: true,
    },
    icon: {
      type: String,
      default: '/icons/snake.svg',
      required: true,
    },
    updatedAt: {
      type: String,
      default: '',
      required: true,
    },
    slug: {
      type: String,
      default: '/posts/',
      required: true,
    },
    tags: {
      type: Array,
      required: false,
    },
    showTags: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
})
</script>

<style lang="scss" scoped>
.mb-0 {
  margin-bottom: 0;
}

.overflow-x-unset {
  overflow-x: unset;
}
</style>
