<template>
  <q-page>
    <q-card unlevated>
      <q-card-section>
        <div class="text-bold text-primary">Mis transacciones</div>
        <q-table :data="tableInformation" :columns="columns">
          <template v-slot:body="props">
            <q-tr :props="props">
              
              <q-td
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
                {{ col.value }}
              </q-td>
              <q-td auto-width>
                <q-btn size="sm" color="accent" round dense @click="retryPayment(props.row)" icon="far fa-credit-card" />
              </q-td>
              </q-tr>
      </template>
        </q-table>
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
      tableInformation: [],
      columns: [
        { name: 'idOrden', label: 'Numero Order', field: 'idOrden', sortable: true },
        { name: 'descripcionOrder', label: 'Descripcion', field: 'descripcionOrder', sortable: true },
        { name: 'proveedor', label: 'Proveedor', field: 'proveedor' },
        { name: 'fechaOperacion', label: 'Fecha', field: 'fechaOperacion' },
        { name: 'estado', label: 'Estado', field: 'estado' },
        { name: 'monto', label: 'monto', field: 'Monto', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ]
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
    },
    retryPayment (row) {
      console.log(row)
      this.$router.push('/payment/' + row.idOrden + '/' + this.$q.localStorage.getItem('tkn') )
    }
  }
}

</script>
