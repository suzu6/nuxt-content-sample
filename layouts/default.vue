<template>
  <div class="site">
    <HeaderMenue />
    <div id="main" class="content columns">
      <div class="column is-8 is-offset-2">
        <nuxt />
      </div>
      <div class="column is-2">
        <!-- <side-bar /> -->
      </div>
    </div>
    <MyFooter />
  </div>
</template>

<script lang="ts">
import GitHubLogo from '@/components/GitHubLogo.vue'
import HeaderMenue from '@/components/common/HeaderMenue.vue'
import MyFooter from '@/components/common/MyFooter.vue'

export default {
  components: {
    HeaderMenue,
    GitHubLogo,
    MyFooter,
  },
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'suzu6',
      },
    ],
  },
}
</script>

<style lang="scss">
@font-face {
  font-family: 'Pacifico';
  font-style: normal;
  font-weight: 400;
  src: local('Pacifico Regular'), local('Pacifico-Regular'),
    url(https://fonts.gstatic.com/s/pacifico/v12/FwZY7-Qmy14u9lezJ-6H6MmBp0u-.woff2)
      format('woff2');
  font-display: swap;
}

$code-color: '#fafafa';

#main {
  min-height: 40vh;
}

body {
  font-family: メイリオ, Meiryo, 游ゴシック Medium, YuGothic, YuGothicM,
    Hiragino Kaku Gothic ProN, メイリオ, Meiryo, sans-serif;
  font-weight: 500;
  font-size: 1rem;
  line-height: 2.1rem;
  color: #3a3a3a;
}

a {
  color: #007d7a;
  cursor: pointer;
  text-decoration: none;
}

.tags span {
  margin-right: 10px;
}
</style>
