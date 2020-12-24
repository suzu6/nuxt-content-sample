<template>
  <footer class="footer">
    <div class="has-text-centered">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <aside class="menu">
            <ul class="menu-list">
              <li v-for="(item, key) of items" :key="key" class="navbar-item">
                <nuxt-link :to="item.to">{{ item.title }}</nuxt-link>
              </li>
              <li class="navbar-item">
                <a href="https://twitter.com/suzu6_py">
                  <i class="mdi mdi-twitter" />&nbsp;@suzu6
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </div>
      <div>
        Icons made by
        <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware"
          >Good Ware</a
        >
        from
        <a href="https://www.flaticon.com/" title="Flaticon"
          >www.flaticon.com</a
        >
        is licensed by
        <a
          href="http://creativecommons.org/licenses/by/3.0/"
          title="Creative Commons BY 3.0"
          target="_blank"
          >CC 3.0 BY</a
        >
      </div>
      <p class="has-text-centered">
        © ️2018 - {{ year.getFullYear() }} suzu6.net
      </p>
    </div>
  </footer>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

export default Vue.extend({
  name: 'MyFooter',
  data() {
    return {
      items: [
        { title: '記事一覧', to: '/posts/' },
        { title: 'タグ一覧', to: '/tags/' },
      ],
      isMenuActive: false,
      year: new Date(),
    }
  },
})
</script>

<style scoped></style>
