<template>
  <q-layout view="lHh Lpr fff" class="bg-grey-1">
    <q-header elevated class="bg-black text-grey-8" height-hint="64">
      <q-toolbar class="GPL__toolbar" style="height: 64px">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
          class="q-mx-md"
          color="grey-2"
        />
        <q-toolbar-title v-if="$q.screen.gt.sm">
          <q-img class="q-ml-md" style="height: 50px; width: 200px;" src="https://login.paytrack.com.br/logo.png"/>
        </q-toolbar-title>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="grey-2" icon="apps">
            <q-tooltip>Other options</q-tooltip>
          </q-btn>
          <q-btn round flat>
            <q-avatar size="40px">
              <img src="https://icon-library.com/images/obi-wan-kenobi-icon/obi-wan-kenobi-icon-22.jpg">
            </q-avatar>
            <q-tooltip>Bienvenido {{userInformation.usuario_nombre}}</q-tooltip>
          </q-btn>
          <q-btn round @click="logout()" dense flat color="grey-2" icon="fas fa-sign-out-alt">
            <q-badge color="red" text-color="white" floating>
              2
            </q-badge>
            <q-tooltip>Logout</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      behavior="mobile"
      class="bg-black"
      @click="leftDrawerOpen = false"
    >
      <q-scroll-area style="background-color: #000000;" class="fit">
        <q-toolbar class="GPL__toolbar q-mb-md">
          <q-toolbar-title class="row items-center">
            <q-img style="height: 50px; width: 200px; margin-left: 16%;" src="https://login.paytrack.com.br/logo.png"/>
          </q-toolbar-title>
        </q-toolbar>

        <q-list padding>
          <q-item v-for="link in links1" :key="link.text" :to="link.to" clickable class="GPL__drawer-item">
            <q-item-section avatar>
              <q-icon color="white" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-white">{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" color="white" />

          <q-item v-for="link in links2" :key="link.text" clickable class="GPL__drawer-item">
            <q-item-section avatar>
              <q-icon color="white" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-white">{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-my-md" color="white" />

          <q-item v-for="link in links3" :key="link.text" clickable class="GPL__drawer-item">
            <q-item-section avatar>
              <q-icon color="white" :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-white">{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="GPL__page-container">
      <router-view :userInfo="userInformation"/>

      <q-page-sticky v-if="$q.screen.gt.sm" expand position="left">
        <div class="fit q-pt-xl q-px-sm column">
          <q-btn flat color="grey-8" stack no-caps size="26px" to="/" class="GPL__side-btn">
            <q-icon size="22px" name="fas fa-money-bill-wave" />
            <div class="GPL__side-btn__label">Mis transacciones</div>
          </q-btn>

          <q-btn flat color="grey-8" stack no-caps size="26px" to="/stadistic" class="GPL__side-btn">
            <q-icon size="22px" name="fas fa-chart-pie" />
            <div class="GPL__side-btn__label">Mis estadisticas</div>
          </q-btn>
        </div>
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'GooglePhotosLayout',
  data () {
    return {
      leftDrawerOpen: false,
      search: '',
      header: { headers: { 'Content-Type': 'application/json' } },
      storage: 0.26,
      links1: [
        { icon: 'fas fa-money-bill-wave', text: 'Mis Transacciones', to: '/' },
        { icon: 'fas fa-chart-pie', text: 'Mis estadisticas', to: '/stadistic' }
      ],
      links2: [
        { icon: 'archive', text: 'Archivos' }
      ],
      links3: [
        { icon: 'settings', text: 'Configuración' },
        { icon: 'help', text: 'Ayuda y Feedback' }
      ],
      createMenu: [
        { icon: 'photo_album', text: 'Album' },
        { icon: 'people', text: 'Shared Album' },
        { icon: 'movie', text: 'Movie' },
        { icon: 'library_books', text: 'Animation' },
        { icon: 'dashboard', text: 'Collage' },
        { icon: 'book', text: 'Photo book' }
      ],
      userInformation: {
        usuario_nombre: '',
        usuario_apellidos: '',
        usuario_correo: '',
        usuario_documento: '',
        usuario_id: 0
      }
    }
  },
  mounted () {
    this.getUsuario()
    this.getTransacciones()
  },
  methods: {
    async getUsuario () {
      await this.$axios
        .get('http://localhost:8000/api/cliente/', {
          headers: {
            Authorization:
              'Bearer ' +
              this.$q.localStorage.getItem('tkn')
          }
        })
        .then(response => {
          this.userInformation.usuario_correo = response.data.email
          this.userInformation.usuario_nombre = response.data.nombres
          this.userInformation.usuario_apellidos = response.data.apellidos
          this.userInformation.usuario_id = response.data.user
          console.log(this.userInformation.usuario_id)
        })
        .catch(response => {
          console.log(response)
        })
    },
    getTransacciones () {
      this.$axios
        .get('http://localhost:8060/paytrack/api/pago/usuario/' + this.userInformation.usuario_id, {
        })
        .then(response => {
          console.log(response.data)
        })
        .catch(response => {
          console.log(response)
        })
    },
    logout () {
      this.$axios
        .get('http://localhost:8060/paytrack/api/pago/usuario/' + this.userInformation.usuario_id, {
        })
        .then(response => {
          this.$q.localStorage.remove('tkn')
          this.$router.push('/login')
        })
        .catch(response => {
          console.log(response)
        })
    }
  }
}
</script>

<style lang="sass">
.GPL
  &__toolbar
    height: 64px
  &__toolbar-input
    width: 35%
  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px
    .q-item__section--avatar
      padding-left: 12px
      .q-icon
        color: #5f6368
    .q-item__label:not(.q-item__label--caption)
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem
    &--storage
      border-radius: 0
      margin-right: 0
      padding-top: 24px
      padding-bottom: 24px
  &__side-btn
    &__label
      font-size: 12px
      line-height: 24px
      letter-spacing: .01785714em
      font-weight: 500
  @media (min-width: 1024px)
    &__page-container
      padding-left: 94px
</style>
