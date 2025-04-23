// public/js/agendamentos.js
const api = '/agendamentos'
const authHeader = () => ({ Authorization: 'Bearer '+localStorage.getItem('token') })

document.getElementById('btn-logout').onclick = () => {
  localStorage.removeItem('token')
  window.location = '/login.html'
}

async function fetchList() {
  const res = await fetch(api, { headers: authHeader() })
  if (res.ok) {
    const list = await res.json()
    document.getElementById('lista').innerHTML =
      list.map(a=>`
        <li>
          <strong>${a.nome_pet}</strong> em ${new Date(a.data_hora).toLocaleString()}
          <button onclick="deleteAg(${a.id})">❌</button>
        </li>`).join('')
  } else {
    document.getElementById('lista').textContent = (await res.json()).error
  }
}

window.deleteAg = async id => {
  await fetch(api+'/'+id, { method:'DELETE', headers: authHeader() })
  fetchList()
}

document.getElementById('form-agendamento').addEventListener('submit', async e => {
  e.preventDefault()
  const fd = new FormData(e.target)
  const res = await fetch(api, { method:'POST', headers: authHeader(), body: fd })
  if (res.ok) {
    e.target.reset()
    fetchList()
  } else alert((await res.json()).error)
})

if (!localStorage.getItem('token')) window.location = '/login.html'
else fetchList()
