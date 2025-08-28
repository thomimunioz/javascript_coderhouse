const contenedorTarjetas = document.getElementById('contenedorTarjetas')

const carritoCantidad = document.getElementById('carrito-cantidad')
const panelCarrito = document.getElementById('panel-carrito')
const itemsCarrito = document.getElementById('items-carrito')
const totalCarrito = document.getElementById('total-carrito')
const btnCerrarCarrito = document.getElementById('cerrar-carrito');
const btnAbrirCarrito = document.getElementById('abrir-carrito')
const botonesAgregarCarrito = document.querySelectorAll(".btn-comprar-simple")
let contadorCarrito = 0

let discos = []
let carrito = []

async function cargarDatos(){
    try {
        const res = await fetch ("./discos.json")
        discos = await res.json()
        cargarDiscos()
    } catch (error) {
        console.error("No se ha podido cargar la lista de discos.")
    }
}

function cargarDiscos() {
    discos.forEach(disco => {
        const div = document.createElement("div")
        const article = document.createElement("article")
        const h2 = document.createElement("h2")
        const img = document.createElement("img")
        const h3 = document.createElement("h3")
        const p = document.createElement("p")
        const button = document.createElement("button")

        div.className = "col-sm-6 col-md-4 col-lg-3"
        article.className = "tarjeta-disco"
        button.className = "btn-comprar-simple"
        h2.textContent = `${disco.titulo}`
        img.src = `${disco.img}`
        h3.textContent = `${disco.artista}`
        p.textContent = formatearPrecio(`${disco.precio}`)
        button.textContent = "Agregar al carrito"
        button.addEventListener('click', actualizarBadgeCarrito)

        contenedorTarjetas.appendChild(div)
        div.appendChild(article)
        article.appendChild(h2)
        article.appendChild(img)
        article.appendChild(h3)
        article.appendChild(p)
        article.appendChild(button)
    })
}

function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-AR', {style:'currency', currency: 'ARS'}).format(precio)
}

function abrirCarrito() {
    panelCarrito.classList.add('abierto')
}

function cerrarCarrito(){
    panelCarrito.classList.remove('abierto')
}

btnAbrirCarrito.addEventListener('click', abrirCarrito)
btnCerrarCarrito.addEventListener('click', cerrarCarrito)

function actualizarBadgeCarrito(){
    contadorCarrito++
    carritoCantidad.textContent = contadorCarrito
    
    if (contadorCarrito == 0) {
    carritoCantidad.classList.add('hidden')
} else {
    carritoCantidad.classList.remove('hidden')
}
}

function agregarAlCarrito(){

}

function renderizarCarrito(){

}


document.addEventListener('DOMContentLoaded', () => {
    cargarDatos()
})
