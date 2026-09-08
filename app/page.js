callback: function(res) {
  alert("Payment done: " + res.reference + " - verifying...")
  fetch("/api/fund", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ 
      reference: res.reference, 
      amount: amount, 
      user_id: "test_user" 
    })
  })
  .then(r => r.json())
  .then(data => {
    console.log(data)
    if(data.success){
      alert(`₦${amount} credited! Balance: ₦${data.balance}`)
      window.location.reload()
    } else {
      alert("DB Error: " + data.error)
    }
    setLoading(false)
  })
  .catch(e => {
    alert("Error: " + e.message)
    setLoading(false)
  })
},
