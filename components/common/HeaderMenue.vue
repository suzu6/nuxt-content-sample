<template>
  <div class="nav-height">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="/icons/logo.svg" />
        </a>

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navMenu"
          :class="{ 'is-active': isMenuActive }"
          @click="toggleMenu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        id="navMenu"
        class="navbar-menu"
        :class="{ 'is-active': isMenuActive }"
      >
        <div class="navbar-start">
          <div v-for="(item, key) of items" :key="key">
            <a
              class="navbar-item"
              :href="item.to"
              exact-active-class="is-active"
              >{{ item.title }}</a
            >
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'HeaderMenue',
  data() {
    return {
      items: [
        { title: 'Home', to: '/' },
        { title: '記事一覧', to: '/posts/' },
      ],
      isMenuActive: false,
    }
  },
  watch: {
    $route() {
      this.isMenuActive = false
    },
  },
  methods: {
    toggleMenu() {
      this.isMenuActive = !this.isMenuActive
    },
  },
})
</script>
