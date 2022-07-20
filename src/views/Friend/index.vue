<template>
  <div class="clearfix">
    <NotLogged v-if="cookie == undefined"></NotLogged>
    <Logged v-else></Logged>
  </div>
</template>

<script>
import NotLogged from './NotLogged'
import Logged from './Logged'
export default {
  name: 'friend',
  components: {
    NotLogged,
    Logged
  },
  computed: {
    cookie () {
      return localStorage.getItem('COOKIE')
    }
  }
}
</script>

<style type="text/css" scoped>
</style>
