import axios from 'axios'
import { LocalStorage } from 'quasar'
const resourceURI = 'http://127.0.0.1:8000/api/login/'
const header = { headers: { 'Content-Type': 'application/json' } }

const state = {
  auths: [],
  stateResult: null
}

const getters = {
  getResultLogin: state => state.stateResult
}

const actions = {
  async fetchAuth ({ commit }, user) {
    await axios.post(resourceURI, user, header)
      .then(response => {
        LocalStorage.set('tkn', response.data.token)
        this.$router.push('/')
        //  showLogedSuccessMessage()
      })
      .catch(response => commit('setErrorLogin', response))
  }
}

const mutations = {
  setErrorLogin: (state, result) => {
    if (result.response) {
      state.stateResult = result.response.status
    } else {
      //  showErrorMessage()
    }
  }
}

export default {
  state, getters, actions, mutations
}
