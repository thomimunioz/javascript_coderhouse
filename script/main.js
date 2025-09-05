const contenedorTarjetas = document.getElementById('contenedorTarjetas')

const carritoCantidad = document.getElementById('carrito-cantidad')
const panelCarrito = document.getElementById('panel-carrito')
const itemsCarrito = document.getElementById('items-carrito')
const totalCarrito = document.getElementById('total-carrito')
const btnCerrarCarrito = document.getElementById('cerrar-carrito');
const btnAbrirCarrito = document.getElementById('abrir-carrito')
const botonesAgregarCarrito = document.querySelectorAll(".btn-comprar-simple")
const contenedorItemsCarrito = document.getElementById('items-carrito')
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
        button.id = `btn-${disco.id}`
        h2.textContent = `${disco.titulo}`
        img.src = `${disco.img}`
        h3.textContent = `${disco.artista}`
        p.textContent = formatearPrecio(`${disco.precio}`)
        button.textContent = "Agregar al carrito"
        button.addEventListener('click', actualizarBadgeCarrito)
        button.addEventListener('click', () => {
            agregarAlCarrito(button.id)
        })

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

function agregarAlCarrito(id){
    let idSeparado = id.split("-")
    id = parseInt(idSeparado[1])

    let discoExiste = carrito.find(producto => producto.id === id)
    let discoParaAgregar = discos.find(disco => disco.id === id)

    if (discoExiste != undefined){
        discoExiste.cantidad++
    } else {
        discoParaAgregar.cantidad = 1
        carrito.push(discoParaAgregar)
    }

    actualizarContador()
    renderizarCarrito()
}

function actualizarContador(){
    contadorCarrito = carrito.reduce((acc, p) => acc + p.cantidad, 0)
    carritoCantidad.textContent = contadorCarrito
    carritoCantidad.classList.toggle('hidden', contadorCarrito === 0)
}

function eliminarProducto(id){
    carrito = carrito.filter(producto => producto.id !== id)
    actualizarContador()
    renderizarCarrito()
}

function renderizarCarrito(){
    contenedorItemsCarrito.innerHTML = ""

    if(carrito.length === 0) {
        document.getElementById("carrito-vacio").classList.remove("hidden")
        totalCarrito.textContent = "$0"
        actualizarBotonFinalizar();
        return
    } else {
        document.getElementById("carrito-vacio").classList.add("hidden")
    }

    carrito.forEach(producto => {
        const div_1 = document.createElement("div")
        div_1.className = "carrito-item d-flex align-items-center mb-3 p-2"
        div_1.style.backgroundColor = "#f5f5f5"
        div_1.style.borderRadius = "6px"
        contenedorItemsCarrito.appendChild(div_1)

        const i = document.createElement("i")
        i.className = "bi bi-x-circle-fill eliminar-item"
        i.addEventListener('click', () => eliminarProducto(producto.id))
        div_1.appendChild(i)

        const div_2 = document.createElement("div")
        div_2.className = "carrito-img me-3"
        div_1.appendChild(div_2)

        const img = document.createElement("img")
        img.src = producto.img
        img.style.width = "50px"
        img.style.height = "50px"
        img.style.objectFit = "cover"
        img.style.borderRadius = "4px";
        div_2.appendChild(img)

        const div_3 = document.createElement("div")
        div_3.className = "carrito-detalle flex-grow-1"
        div_1.appendChild(div_3)

        const div_4 = document.createElement("div")
        div_4.className = "carrito-titulo fw-bold"
        div_4.textContent = producto.titulo
        div_3.appendChild(div_4)

        const div_5 = document.createElement("div")
        div_5.className = "carrito-artista text-muted"
        div_5.style.fontSize = "0.9rem"
        div_5.textContent = producto.artista
        div_3.appendChild(div_5)

        const div_6 = document.createElement("div")
        div_6.className = "carrito-cantidad px-3"
        div_6.textContent = "x" + producto.cantidad
        div_1.appendChild(div_6)

        const div_7 = document.createElement("div")
        div_7.className = "carrito-precio fw-bold"
        div_7.textContent = formatearPrecio(producto.precio * producto.cantidad)
        div_1.appendChild(div_7)

        let total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0)
        totalCarrito.textContent = formatearPrecio(total)
        
    });

        actualizarBotonFinalizar();
}

function actualizarBotonFinalizar() {
    const btnFinalizar = document.getElementById("finalizar-compra");
    if (carrito.length === 0) {
        btnFinalizar.disabled = true;
        btnFinalizar.classList.add('disabled');
    } else {
        btnFinalizar.disabled = false;
        btnFinalizar.classList.remove('disabled');
    }
}


function mostrarCompraExitosaRedirigiendo(segundos = 5, url = "index.html") {
Swal.fire({
    title: "¡Compra realizada!",
    html: `Gracias por tu compra 😃 <br><br>
        Redirigiéndote a home en <b>${segundos}</b> segundos...`,
    icon: "success",
    showConfirmButton: false,
    allowOutsideClick: false,
    timerProgressBar: true,
    didOpen: () => {
    const content = Swal.getHtmlContainer().querySelector("b");

    const timerInterval = setInterval(() => {
        segundos--;
        content.textContent = segundos;
        if (segundos <= 0) {
        clearInterval(timerInterval);
        window.location.href = url;
        }
    }, 1000);
    }
});
}

document.getElementById("finalizar-compra").addEventListener("click", () => {
    mostrarCompraExitosaRedirigiendo();
});

document.addEventListener('DOMContentLoaded', () => {
    cargarDatos()
    actualizarBotonFinalizar();
})