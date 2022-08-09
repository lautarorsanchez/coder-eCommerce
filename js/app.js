// Lista de productos

const products = [
    {
        id: 1,
        name: 'El Principito',
        value: 50,
        image: './assets/products/principito.webp',
        ammount: 1
    },
    {
        id: 2,
        name: 'Orgullo y prejuicio',
        value: 70,
        image: './assets/products/orgullo.webp',
        ammount: 1
    },
    {
        id: 3,
        name: 'Harry Potter',
        value: 100,
        image: './assets/products/harry.jpg',
        ammount: 1
    },
    {
        id: 4,
        name: 'El arte de la guerra',
        value: 60,
        image: './assets/products/guerra.jfif',
        ammount: 1
    },
    {
        id: 5,
        name: 'Papillon',
        value: 90,
        image: './assets/products/papillon.webp',
        ammount: 1
    }
]

// funcion que itera dentro del array de productos y los muestra en el dom

const mostrarProductos = () => {
    let container = document.querySelector('#container')    
    for (const product of products) {
        let list = document.createElement('div') 
        list.innerHTML = `
        <div class="col mb-5">
        <div class="card h-100">
        <!-- Product image-->
        <img class="card-img-top" src="${product.image}" alt="..." />
        <!-- Product details-->
        <div class="card-body p-4">
            <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder"0>${product.name}</h5>
                <!-- Product price-->
                $${product.value}
            </div>
        </div>
        <!-- Product actions-->
        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
            <div class="text-center"><button class='buttonto' id="${product.id}">Add to cart</button></div>
        </div>
        </div>
        </div>`

        container.append(list)
        
    }
}

// CARGA DE LA APP //
// Incializacion del carrito vacio
let carrito = []

// Muestra las tarjetas
mostrarProductos()

// Guarda el carrito del local (si existe) en una variable
let obtenerCarrito = JSON.parse(localStorage.getItem("Carrito"))


// Parsea el carrito si existe en local storage
if(obtenerCarrito) {
    carrito = obtenerCarrito
    actualizarCarrito(obtenerCarrito)
    totalCarrito()
    //actualizarContador(obtenerCarrito)
} else {
    localStorage.setItem('Carrito','[]')
    totalCarrito()
}



// Carrito

const botones = document.querySelectorAll(".buttonto")

//const contadorCarrito = document.querySelector("#contador")

//funcion para agregar productos al carrito

for (const boton of botones) {
    boton.addEventListener("click", agregarProducto)

  }

  function agregarProducto(e) {

    e.preventDefault()

    e.target.innerHTML = "Agregado" // cambiar esto por funcion para eliminar del carrito
    // e.target.setAttribute("disabled", true) 
    let productoClickeado = products.find((item) => item.id == e.target.id) 
    carrito.push(productoClickeado)
    localStorage.setItem("Carrito", JSON.stringify(carrito)) 
  let carritoLocal = JSON.parse(localStorage.getItem("Carrito"))  
  actualizarCarrito(carritoLocal)
  actualizarBotones(carritoLocal)
  
// eliminar producto  
  let botonesBorrar = document.querySelectorAll(".borrar")
  for (const borrar of botonesBorrar) {
    borrar.addEventListener("click", eliminarProducto)
  }
  totalCarrito()
  // actualizarBotones()
}

// funcion  de actualizar carrito al hacer agregar producto

function actualizarCarrito(local){
    
    let cartContainer = document.querySelector("#carrito");
    cartContainer.innerHTML = "" 

    for (const carritu of local) {
        let list = document.createElement('tr') 
        list.innerHTML = `   
        <th scope="row"><img src='${carritu.image}' height='50px' width='50px'></img></th>
        <td>${carritu.name}</td>
        <td>${carritu.value}</td>
        <td><button class='borrar' id='${carritu.id}'>BORRAR</button></td>
        `
        cartContainer.append(list)
    }
  
    
    totalCarrito()

}

// borrar productos del carrito 

const botonesBorrar = document.querySelectorAll(".borrar")
  for (const borrar of botonesBorrar) {
    borrar.addEventListener("click", eliminarProducto)
  }

function eliminarProducto(e) {
    let productoEliminar = carrito.find((item) => item.id == e.target.id)
    indiceDeProducto = carrito.indexOf(productoEliminar); ///indexOf devuelve el indice del elemento en el array.

    carrito.splice(indiceDeProducto, 1); // splice() elimina elementos, requiere dos parametros. El primero es el indice, y el segundo la cantidad de elemetos que queres eliminar.
    localStorage.setItem("Carrito", JSON.stringify(carrito)); // Actualizamos el local.
    let carritoLocal = JSON.parse(localStorage.getItem("Carrito"))  
    actualizarCarrito(carritoLocal);

    let botonesBorrar = document.querySelectorAll(".borrar")
  for (const borrar of botonesBorrar) {
    borrar.removeEventListener("click", eliminarProducto)
    borrar.addEventListener("click", eliminarProducto)

    
  } 

  totalCarrito()
   
}



  
// funcion que actualiza los botones

function actualizarBotones(local) {
    for (const item of local) {
      for (const btn of botones) {
        if (item.id == btn.id) {
          let botonAdd = document.getElementById(`${item.id}`)
          botonAdd.setAttribute("disabled", true)
          // Desactivo el Boton.
          botonAdd.innerHTML = "Agregado"; // Cambio el Texto
          botonAdd.style.minWidth = "202px"; //Eso lo hago aca por que me dio fiaca modificarlo del CSS y ademas como ejemplo de modificar el CSS con eventos.
          totalCarrito()
        }
      }
    }
  }


  // total carrito

function totalCarrito(){
    let totalPrecio = document.querySelector("#totalPrecio") 
    let resPrecio = carrito.reduce((acumulador, actual) => acumulador + actual.value, 0); 
    totalPrecio.innerHTML = `<p> Precio Total:${resPrecio} </p>`
    
    let totalProductos = document.querySelector("#totalProductos")
    let resProductos = carrito.length
    totalProductos.innerHTML = `<p> Cantidad de Productos: ${resProductos}</p>`
    
    let cartCounter = document.querySelector('#contador')
    cartCounter.innerHTML = `<a id='#idcarrito'>${resProductos}</a>`
    

}


//vaciar carrito
let vaciarCarrito = document.querySelector("#vaciarCarrito")
vaciarCarrito.addEventListener('click',borrarCarrito)

function borrarCarrito(){
    carrito = []
    localStorage.setItem("Carrito", JSON.stringify(carrito)); // Actualizamos el local.
    let carritoLocal = JSON.parse(localStorage.getItem("Carrito"))  
    actualizarCarrito(carritoLocal);

}




