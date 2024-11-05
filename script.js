const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const nomeProduto = document.querySelector('#m-nome')
const corProduto = document.querySelector('#m-cor')
const precoProduto = document.querySelector('#m-preco')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

   }

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.cor}</td>
    <td>R$ ${item.preco}</td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bi bi-trash3-fill'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (nomeProduto.value == '' || corProduto.value == '' || precoProduto.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = nomeProduto.value
    itens[id].funcao = corProduto.value
    itens[id].salario = precoProduto.value
  } else {
    itens.push({'nome': nomeProduto.value, 'cor': corProduto.value, 'preco': precoProduto.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
