<template>
  <q-page class="window-height">
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-md-4">
        <div class="login-form window-height">
          <form @submit.prevent="login">
            <q-form class="q-gutter-md">
              <div class="text-center">
                <img src="https://www.paytrack.com.br/wp-content/uploads/2019/12/flecha-1.png" alt="Paytrack">
              </div>
              <q-input
                  v-model="email" @keydown.enter.prevent="login" type="email" label="Email" :rules="[val => !!val || 'Username is required']">
                <template v-slot:prepend>
                  <q-icon name="fa fa-user" />
                </template>
                <template v-if="[null, void 0, ''].indexOf(email) === -1" v-slot:append>
                    <q-icon name="cancel" @click.stop="email = ''" class="cursor-pointer" />
                </template>
              </q-input>
              <q-input v-model="password" @keydown.enter.prevent="login" type="password" label="Password" :rules="[val => !!val || 'Password is required']">
                <template v-slot:prepend>
                  <q-icon name="fa fa-key" />
                </template>
                <template v-if="[null, void 0, ''].indexOf(password) === -1" v-slot:append>
                    <q-icon name="cancel" @click.stop="password = ''" class="cursor-pointer" />
                </template>
              </q-input>
            </q-form>
            <div class="row q-pt-sm">
              <div class="col-xs-12 col-sm-7 col-md-8">
                <q-btn flat no-caps color="primary" label="Forgot?" />
              </div>
              <div class="col-xs-12 col-sm-5 col-md-4">
                <q-btn unelevated :disabled="buttomCharge" :loading="buttomCharge" color="secondary" class="q-px-md float-right" label="Login" type="submit" />
              </div>
            </div>
            <div class="row login-or">
              <div class="col-xs-12 col-sm-12 col-md-12">
                <span class="span-or">{{ 'o' }}</span>
              </div>
            </div>
            <div class="text-center">
              <q-btn flat no-caps color="primary" label="Crear"  />
            </div>
            <p class="text-red-14 text-center" v-if="state">{{ state }}</p>
          </form>
        </div>
        <div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-8 login-slider">
        <q-carousel animated v-model="slide" navigation infinite autoplay height="100%">
          <q-carousel-slide name="second" img-src="https://c0.wallpaperflare.com/preview/65/660/886/computer-keyboard-sale-technology.jpg">
            <div class="absolute-bottom custom-caption">
              <div class="text-h1">Paytrack</div>
              <div class="text-subtitle1">Mensaje subliminal xd</div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="first" img-src="https://siren.io/wp-content/uploads/Payments1_rendered1920x1080_WebReady.png">
            <div class="absolute-bottom custom-caption">
              <div class="text-h1">Paytrack</div>
              <div class="text-subtitle1">Pagos seguros, dame tu dinero.</div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  components: {
  },
  data () {
    return {
      tab: 'register',
      email: '',
      password: '',
      slide: 'first',
      state: false,
      buttomCharge: false
    }
  },
  created () {
    if (this.$q.localStorage.getItem('tkn') !== null) this.$router.push('/')
  },
  methods: {
    ...mapActions(['fetchAuth']),
    login () {
      this.apiCall()
    },
    async apiCall () {
      this.buttomCharge = true
      const userAuth = {
        username: this.email,
        password: this.password
      }
      await this.fetchAuth(userAuth)
      this.buttomCharge = false
    }
  },
  watch: {
    lang (lang) {
      this.$i18n.locale = lang
    }
  }
}
</script>
