<template>
  <q-page class="window-height">
    <div class="row justify-center q-pt-xl">
      <div class="col-xs-12 col-sm-8 col-md-4">
        <q-card>
          <q-card-section class="bg-orange-6">
            <p class="text-h5 text-white text-center text-light">
              <q-icon color="white" size="md" name="fas fa-shield-alt"></q-icon>
              {{ 'Pagando con Paytrack' }}
            </p>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="row q-gutter-md">
              <div class="col q-gutter-md">
                <form action="/process_payment" method="post" id="paymentForm">
                  <p class="text-h5 text-cyan-8 text-light">Detalles del comprador</p>
                  <q-separator></q-separator>
                  <div class="q-pt-md">
                    <div>
                      <label class="text-subtitle text-cyan-8 text-light q-pr-md" for="email">E-mail:</label>
                      <input id="email" v-model="userInformation.usuario_correo" name="email" type="text" value="" />
                    </div>
                    <div>
                      <label class="text-subtitle text-cyan-8 text-light q-pr-md" for="docType">Tipo de documento:</label>
                      <select id="docType" name="docType" data-checkout="docType" type="text"></select>
                    </div>
                    <div>
                      <label class="text-subtitle text-cyan-8 text-light q-pr-md" for="docNumber">Número de documento:</label>
                      <input id="docNumber" v-model="userInformation.usuario_documento" name="docNumber" data-checkout="docNumber" type="text" />
                    </div>
                  </div>
                  <p class="text-h5 text-cyan-8 text-light">Detalles de la tarjeta</p>
                  <q-separator></q-separator>
                  <div class="q-pt-md">
                    <div>
                      <label class="text-subtitle text-cyan-8 text-light q-pr-md" for="cardholderName">Titular de la tarjeta:</label>
                      <input id="cardholderName" data-checkout="cardholderName" type="text" />
                    </div>
                    <div>
                      <label class="text-subtitle text-cyan-8 text-light q-pr-md" for="">Fecha de vencimiento:</label>
                      <div>
                        <input
                          type="text"
                          class="little"
                          placeholder="MM"
                          id="cardExpirationMonth"
                          data-checkout="cardExpirationMonth"
                          onselectstart="return false"
                          onpaste="return false"
                          oncopy="return false"
                          oncut="return false"
                          ondrag="return false"
                          ondrop="return false"
                          autocomplete="off"
                        />
                        <span class="date-separator">/</span>
                        <input
                          type="text"
                          class="little"
                          placeholder="YY"
                          id="cardExpirationYear"
                          data-checkout="cardExpirationYear"
                          onselectstart="return false"
                          onpaste="return false"
                          oncopy="return false"
                          oncut="return false"
                          ondrag="return false"
                          ondrop="return false"
                          autocomplete="off"
                        />
                      </div>
                    </div>
                    <div>
                      <label class="text-subtitle text-cyan-8 text-light q-pr-md" for="cardNumber">Número de la tarjeta:</label>
                      <input
                        type="text"
                        id="cardNumber"
                        data-checkout="cardNumber"
                        maxlength="19"
                        placeholder="xxxx xxxx xxxx xxxx"
                        pattern="[0-9\s]{13,19}"
                        onselectstart="return false"
                        onpaste="return false"
                        oncopy="return false"
                        oncut="return false"
                        ondrag="return false"
                        ondrop="return false"
                        autocomplete="off"
                      />
                    </div>
                    <div>
                      <label class="text-subtitle text-cyan-8 text-light q-pr-md" for="securityCode">Código de seguridad:</label>
                      <input
                        id="securityCode"
                        data-checkout="securityCode"
                        type="text"
                        class="little"
                        onselectstart="return false"
                        onpaste="return false"
                        oncopy="return false"
                        oncut="return false"
                        ondrag="return false"
                        ondrop="return false"
                        autocomplete="off"
                      />
                    </div>
                    <div id="issuerInput">
                      <label class="text-subtitle text-cyan-8 text-light q-pr-md" for="issuer">Banco emisor:</label>
                      <select id="issuer" name="issuer" data-checkout="issuer"></select>
                    </div>
                    <div>
                      <label class="text-subtitle text-cyan-8 text-light q-pr-md" for="installments">Cuotas:</label>
                      <select type="text" id="installments" name="installments"></select>
                    </div>
                    <div>
                      <input type="hidden" name="transactionAmount" id="transactionAmount" value="100" />
                      <input type="hidden" name="paymentMethodId" id="paymentMethodId" />
                      <input type="hidden" name="description" id="description" />
                      <br />
                      <button class="mercadopago-button" type="submit">Pagar</button>
                      <br />
                    </div>
                  </div>
                </form>
              </div>
            </div>
             </q-card-section>
        </q-card>
      </div>
      <div class="col-xs-12 col-sm-8 col-md-3 q-pt-xl">
        <q-card flat bordered>
          <q-card-section>
            <p class="text-h6 text-center text-cyan-8 text-light">Paytrack</p>
            <div class="row q-gutter-md">
              <q-separator></q-separator>
              <div class="col">
                <p class="text-h6 text-left text-cyan-8 text-light">
                  Valor: {{userInformation.monto_total}} ./s
                </p>
              </div>
              <q-separator></q-separator>
              <div class="col">
                <p class="text-h6 text-left text-cyan-8 text-light">
                  Total: {{userInformation.monto_total}} ./s
                </p>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Payment',
  components: {},
  data () {
    return {
      tab: 'register',
      email: '',
      password: '',
      slide: 'first',
      state: false,
      buttomCharge: false,
      documentTypes: [],
      cardNumber: '',
      userInformation: {
        usuario_correo: '',
        usuario_documento: '',
        monto_total: 0.00
      }
    }
  },
  mounted() {
    this.getOrderInformation()
    $(document).ready(function() {
      var publicKey = 'TEST-5c409fd1-3ffc-4545-a0b2-4744a55adb0e'
      var cardnumber = $('#cardNumber')
      var idNumber = this.$route.params.idOrden
      console.log(idNumber)
      var paymentMethodId = $('#paymentMethodId')
      var transactionAmount = $('#transactionAmount')
      var docType = $('#docType')
      var paymentForm = $('#paymentForm')
      Mercadopago.setPublishableKey(publicKey)  
      Mercadopago.getIdentificationTypes()
      docType.select2({})
      var id_cliente = ''
      var id_cliente = '693373613-YXonnK07bOfOAB'
      function getInstallments(paymentMethodId, transactionAmount, issuerId) {
        window.Mercadopago.getInstallments(
          {
            payment_method_id: paymentMethodId,
            amount: parseFloat(transactionAmount),
            issuer_id: parseInt(issuerId)
          },
          setInstallments
        )
      }

      function setInstallments(status, response) {
        if (status == 200) {
          document.getElementById('installments').options.length = 0
          response[0].payer_costs.forEach(payerCost => {
            let opt = document.createElement('option')
            opt.text = payerCost.recommended_message
            opt.value = payerCost.installments
            document.getElementById('installments').appendChild(opt)
          })
        } else {
          alert(`installments method info error: ${response}`)
        }
      }

      cardnumber.change(function() {
        if (cardnumber.val().length >= 6) {
          let bin = cardnumber.val().substring(0, 6)
          Mercadopago.getPaymentMethod(
            {
              bin: bin
            },
            setPaymentMethod
          )
        }
      })

      function setPaymentMethod(status, response) {
        if (status == 200) {
          let paymentMethod = response[0]
          paymentMethodId.val(paymentMethod.id)
          getIssuers(paymentMethod.id)
        } else {
          alert(`payment method info error: ${response}`)
        }
      }

      function getIssuers(paymentMethodId) {
        Mercadopago.getIssuers(paymentMethodId, setIssuers)
      }

      function setIssuers(status, response) {
        if (status == 200) {
          let issuerSelect = $('#issuer')
          response.forEach(issuer => {
            let option =
              '<option value="' + issuer.id + '">' + issuer.name + '</option>'
            issuerSelect.append(option)
          })
          issuerSelect.select2({})

          getInstallments(
            paymentMethodId.val(),
            transactionAmount.val(),
            issuerSelect.val()
          )
        } else {
          alert(`issuers method info error: ${response}`)
        }
      }
      var doSubmit = false
      paymentForm.submit(function(event) {
        event.preventDefault()
        if (!doSubmit) {
          Mercadopago.createToken(paymentForm, setCardTokenAndPay)
        }
      })
      function setCardTokenAndPay(status, response) {
        if (status == 200 || status == 201) {
          let card = document.createElement('input')
          card.setAttribute('name', 'token')
          card.setAttribute('type', 'hidden')
          card.setAttribute('value', response.id)
          paymentForm.append(card)
          doSubmit = true
          paymentForm.submit()
          this.createPayment()
          /** var xhr = require("xmlhttprequest").XMLHttpRequest
          xhr.open('POST', 'http://localhost:8060/paytrack/api/pago', true)
          xhr.onreadystatechange = function(response) {}
          xhr.send(fd) **/
          console.log(fd)
          //e.preventDefault()
          /*$.ajax({
            url: 'http://localhost:8060/paytrack/api/pago',
            method: 'POST',
            data: fd,//JSON.stringify(data),
            success: function(result) {
				    console.log(result)
             }
    	    })*/
        } else {
          alert('Verify filled data!\n' + JSON.stringify('response', null, 4))
        }
      }
    })
  },
  methods: {
    login() {
      this.apiCall()
    },
    guessPaymentMethod(event) {
      if (this.cardNumber.length >= 6) {
        var bin = this.cardNumber.substring(0, 6)
        window.Mercadopago.getPaymentMethod(
          {
            bin: bin
          },
          this.setPaymentMethod
        )
      }
    },
    setPaymentMethod(status, response) {
      if (status === 200) {
        var paymentMethod = response[0]
        document.getElementById('paymentMethodId').value = paymentMethod.id
        this.getIssuers(paymentMethod.id)
      } else {
        alert(`payment method info error: ${response}`)
      }
    },
    getIssuers(paymentMethodId) {
      window.Mercadopago.getIssuers(paymentMethodId, this.setIssuers())
    },
    setIssuers(status, response) {
      if (status === 200) {
        var issuerSelect = document.getElementById('issuer')
        response.forEach(issuer => {
          const opt = document.createElement('option')
          opt.text = issuer.name
          opt.value = issuer.id
          issuerSelect.appendChild(opt)
        })
        this.getInstallments(
          document.getElementById('paymentMethodId').value,
          document.getElementById('transactionAmount').value,
          issuerSelect.value
        )
      } else {
        alert(`issuers method info error: ${response}`)
      }
    },
    getInstallments(paymentMethodId, transactionAmount, issuerId) {
      window.Mercadopago.getInstallments(
        {
          payment_method_id: paymentMethodId,
          amount: parseFloat(transactionAmount),
          issuer_id: parseInt(issuerId)
        },
        this.setInstallments()
      )
    },
    setInstallments(status, response) {
      if (status === 200) {
        document.getElementById('installments').options.length = 0
        response[0].payer_costs.forEach(payerCost => {
          const opt = document.createElement('option')
          opt.text = payerCost.recommended_message
          opt.value = payerCost.installments
          document.getElementById('installments').appendChild(opt)
        })
      } else {
        alert(`installments method info error: ${response}`)
      }
    },
    async apiCall() {
      this.buttomCharge = true
      const userAuth = {
        username: this.email,
        password: this.password
      }
      await this.fetchAuth(userAuth)
      this.buttomCharge = false
      const state = this.$store.getters.getResultLogin
      if (state !== null) {
        switch (state) {
          case 401:
            this.state = this.$t('login.userError')
            break
          default:
            break
        }
      }
    },
    internalAUthorization() {
      this.fetchInternalAuth()
    },
    getDocumentTypes() {
      this.$axios
        .get('https://api.mercadopago.com/v1/identification_types', {
          headers: {
            Authorization:
              'Bearer ' +
              'TEST-3952754901099363-122420-24b46b6510555960d2ac224d8be5ed14-639371765'
          }
        })
        .then(response => {
          this.documentTypes = response.data
          this.documentTypes.forEach(element => {
            element.label = element.name
          })
        })
        .catch(response => {
          console.log(response)
        })
    },
    getOrderInformation() {
      this.$axios
        .get('http://127.0.0.1:8000/api/orden/' + this.$route.params.idOrden, {
          headers: {
            Authorization:
              'Token ' +
              this.$route.params.token
          }
        })
        .then(response => {
          this.userInformation.usuario_correo = response.data.usuario_correo
          this.userInformation.usuario_documento = response.data.usuario_documento
          this.userInformation.monto_total = response.data.monto_total
        })
        .catch(response => {
          console.log(response)
        })
    },
    createPayment () {
      var fd = new FormData()
      fd.append('idOrden', this.$route.params.idOrden)
      fd.append('token', response.id)
      fd.append('transactionAmount', this.userInformation.monto_total)
      fd.append('installments', $('#installments').val()  )
      fd.append('paymentMethodId', document.getElementById('paymentMethodId').value)
      fd.append('docType', 'DNI')
      fd.append('docNumber', this.userInformation.usuario_documento)
      fd.append('email', userInformation.usuario_correo)
      console.log(fd)
      this.$axios
        .post('http://localhost:8060/paytrack/api/pago', {
          headers: {
            Authorization:
              'Bearer ' +
              'TEST-3952754901099363-122420-24b46b6510555960d2ac224d8be5ed14-639371765'
          }
        })
        .then(response => {
          this.documentTypes = response.data
          this.documentTypes.forEach(element => {
            element.label = element.name
          })
        })
        .catch(response => {
          console.log(response)
        })
    }

  },
  watch: {
    lang(lang) {
      this.$i18n.locale = lang
    }
  }
}
</script>
<style>
button.mercadopago-button {
  background-color: #fff;
  color: #111;
  border: 1px solid #111;
  border-radius: 0;
}
input[type=text] {
  width: 60%;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
input.little {
  width: 12%;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
select {
  width: 60%;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
#right form button[type="submit"] {
	padding: 200px;
	border: none;
	border-radius: 50px;
	color: white;
	font-weight: 400;
	font-size: 12pt;
	margin-top: 200px;
}
</style>