<template>
  <q-layout view="hHh lpR lFf">
    <div class="bg-bisnes">
      <q-page-container class="bg-degraded">
        <router-view />
      </q-page-container>
    </div>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/login.css'
</style>
