<template>
  <q-page class="flex flex-center">
    <q-card unlevated>
      <q-card-section>
        <div class="text-bold text-primary">Mis transacciones</div>
        <q-table :data="tableInformation"></q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object
    }
  },
  data () {
    return {
      tableInformation: []
    }
  },
  mounted () {
    this.getPayment()
  },
  methods: {
    getPayment () {
      this.$axios
        .get('http://localhost:8060/paytrack/api/pago/usuario/' + this.userInfo.usuario_id)
        .then(response => {
          console.log(response)
          this.tableInformation = response.data
        })
        .catch(response => {
          console.log(response)
        })
    }
  }
}

</script>
