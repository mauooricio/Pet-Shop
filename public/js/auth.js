// public/js/auth.js
const api = '/auth'

document.getElementById('form-login')?.addEventListener('submit', async e => {
  e.preventDefault()
  const body = Object.fromEntries(new FormData(e.target))
  const res = await fetch(api + '/login', {
    method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body)
  })
  if (res.ok) {
    const { token } = await res.json()
    localStorage.setItem('token', token)
    window.location = '/agendamentos.html'
  } else alert((await res.json()).error)
})

document.getElementById('form-register')?.addEventListener('submit', async e => {
  e.preventDefault()
  const body = Object.fromEntries(new FormData(e.target))
  const res = await fetch(api + '/register', {
    method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body)
  })
  if (res.ok) alert('Registrado! Faça login.')
  else alert((await res.json()).error)
})
