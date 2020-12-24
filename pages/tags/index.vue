<template>
  <section class="section">
    <h4>タグ一覧</h4>
    <div class="tags">
      <i class="mdi mdi-tag" />&nbsp;
      <span v-for="tag in tags" :key="tag.name">
        <a :href="'/tags/' + tag.name.toLowerCase()" class="tag"
          >{{ tag.name }} ({{ tag.count }})</a
        >
      </span>
    </div>
  </section>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import TagService from '@/app/Services/TagService'
import Tag from '@/Domains/Models/Tag'
export default Vue.extend({
  name: 'TagsPage',
  fetch() {
    this.getTags()
  },
  data() {
    return {
      tags: new Array<Tag>(),
      tagService: new TagService(),
    }
  },
  methods: {
    async getTags() {
      const query = await this.$content('posts')
        .where({ isDraft: false })
        .only(['tags'])

      query.fetch().then((responce) => {
        this.tagService.setTags(responce)
        this.tags = this.tagService.getTags()
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.tags span a {
  font-size: 1.2rem;
}
</style>
