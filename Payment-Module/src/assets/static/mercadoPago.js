console.log('i try so hard')
$(document).ready(function () {
  publicKey = 'TEST-5c409fd1-3ffc-4545-a0b2-4744a55adb0e'
  cardnumber = $('#cardNumber')
  paymentMethodId = $('#paymentMethodId')
  transactionAmount = $('#transactionAmount')
  docType = $('#docType')
  paymentForm = $('#paymentForm')
  console.log('holi')
  //Setear llave pública
  Mercadopago.setPublishableKey(publicKey)
  //Combo tipos de documento
  Mercadopago.getIdentificationTypes()
  docType.select2({})
  id_cliente = ''
  /*cliente={
  	'email': 'bruno@gmail.com',
  	'first_name': 'Bruce',
  	'last_name': 'Wayne',
  	'phone': {
  		'area_code': '023',
  		'number': '12345678'
  	},
  	'identification': {
  		'type': 'DNI',
  		'number': '12345678'
  	},
  	'address': {
  		'zip_code': 'SG1 2AX',
  		'street_name': 'Old Knebworth Ln'
  	},
  	'description': 'Lorem Ipsum'
  }
  $.ajax({
  	url: 'https://api.mercadopago.com/v1/customers',
  	method: 'POST',
  	data:JSON.stringify(cliente),
  	headers:{'Authorization':  'Bearer '+accessToken},
  	success: function(result) {
  		console.log(result)
  		id_cliente=result.id
  	}
  })*/
  id_cliente = '693373613-YXonnK07bOfOAB'
  //Crear tarjeta
  /*
  $.ajax({
  	url: 'https://api.mercadopago.com/v1/customers/'+id_cliente+'/cards',
  	method: 'POST',
  	data:JSON.stringify({
  		'token': 'b3a7dbec3eb0d71798c4f19fec445795'
  	  }),
  	headers:{'Authorization':  'Bearer '+accessToken},
  	success: function(result) {
  		console.log(result)
  	}
  })
  */




  function getInstallments(paymentMethodId, transactionAmount, issuerId) {
    window.Mercadopago.getInstallments({
      payment_method_id: paymentMethodId,
      amount': parseFloat(transactionAmount),
      issuer_id: parseInt(issuerId)
    }, setInstallments)
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

  cardnumber.change(function () {

    if (cardnumber.val().length >= 6) {
      let bin = cardnumber.val().substring(0, 6)
      Mercadopago.getPaymentMethod({
        bin: bin
      }, setPaymentMethod)
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
    Mercadopago.getIssuers(
      paymentMethodId,
      setIssuers
    )
  }

  function setIssuers(status, response) {
    if (status == 200) {
      let issuerSelect = $('#issuer')
      response.forEach(issuer => {
        let option = '<option value="' + issuer.id + '">' + issuer.name + '</option>'
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

  doSubmit = false
  paymentForm.submit(function (event) {
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
      /*data={"id_orden":$("#id_orden").val(),
      	  "token":$('input[name$="token"]').val(), 
      	  "transaction_amount":$("#transaction_amount").val(), 
      	  "installments":$("#installments").val(), 
      	  "payment_method_id":$("#payment_method_id").val(),
      	  "payer_email":$("#email").val()}*/
      //var fd = new FormData(paymentForm)
      var fd = new FormData()
      fd.append('idOrden', $('#id_orden').val())
      fd.append('token', $('input[name$="token"]').val())
      fd.append('transactionAmount', $('#transactionAmount').val())
      fd.append('installments', $('#installments').val())
      fd.append('paymentMethodId', $('#paymentMethodId').val())
      fd.append('docType', $('#docType').val())
      fd.append('docNumber', $('#docNumber').val())
      fd.append('email', $('#email').val())
      xhr = new XMLHttpRequest()

      xhr.open('POST', 'http://localhost:8060/paytrack/api/pago', true)
      xhr.onreadystatechange = function (response) {}
      xhr.send(fd)

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
      alert('Verify filled data!\n' + JSON.stringify(response, null, 4))
    }
  }





})
