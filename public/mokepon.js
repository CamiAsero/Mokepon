const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')
const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')
const sectionmensajes = document.getElementById('mensajes')
const cajamensajes = document.getElementById('caja-mensajes')
const sectionMensajes = document.getElementById('mensaje-final')
const removerElegirAtaque = document.getElementById('subtitulo')
const removerContenedorDeAtaque = document.getElementById('contenedor-de-ataques')
const contenedorderesultados = document.getElementById('contenedor-de-combate')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorDeAtaques = document.getElementById('contenedor-de-ataques')
const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueAleatorioEnemigo = []
let opcionDeMokepones
let inputHipotamo
let inputCapibero
let inputRatiaji
let inputCocofire
let inputTucapalma
let inputPydos
let mascotaJugador
let mokeponEnElMapa
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego 
let botonAgua  
let botonTierra 
let botonAire
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './Mokepon imagen/mapafondo.png'
let alturaBuscadaMapa
let anchoDelMapa = window.innerWidth - 13
const anchoMaximoDelMapa = 810

if(anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 13;
    alturaBuscadaMapa = anchoMaximoDelMapa * 873 / 1280;
}

alturaBuscadaMapa = anchoDelMapa * 473 / 800


mapa.width = anchoDelMapa
mapa.height = alturaBuscadaMapa

class Mokepon {
    constructor(nombre, foto, vida, mapaFoto, id = null) {
        this.id = id
        this.nombre = nombre 
        this.foto = foto 
        this.vida = vida 
        this.ataques = []
        this.ancho = 45
        this.alto = 45 //mapa mokepones y su posición
        this.x = aleatorio(0, anchoDelMapa - this.ancho)
        this.y = aleatorio(0, alturaBuscadaMapa - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = mapaFoto //cabezas mokepones
        this.velocidadX = 0
        this.velocidadY = 0
    }

    dibujarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipotamo = new Mokepon('Hipotamo', './Mokepon imagen/hipotamso.png', 5, './Mokepon imagen/hipotamocabeza.png')
let capibero = new Mokepon('Capibero', './Mokepon imagen/noc.png', 5, './Mokepon imagen/capiberocabeza.png')
let ratiaji = new Mokepon('Ratiaji', './Mokepon imagen/ratiajiu.png', 5, './Mokepon imagen/ratiajicabeza.png')
let cocofire = new Mokepon('Cocofire', './Mokepon imagen/cocofire.png', 5, './Mokepon imagen/cocofirecabeza.png')
let tucapalma = new Mokepon('Tucapalma', './Mokepon imagen/Toucannon.png', 5, './Mokepon imagen/tucapalmacabeza.png')
let pydos = new Mokepon('Pydos', './Mokepon imagen/pypydos.png', 5, './Mokepon imagen/pipidos.png')



const HIPOTAMO_ATAQUES = [
    { nombre: 'AGUA 💧', id: 'boton-agua' },
    { nombre: 'AGUA 💧', id: 'boton-agua' },
    { nombre: 'AGUA 💧', id: 'boton-agua' },
    { nombre: 'FUEGO 🔥', id: 'boton-fuego' },
    { nombre: 'TIERRA 🌱', id: 'boton-tierra' }, 
    { nombre: 'AIRE ⛅', id: 'boton-aire' },

]
hipotamo.ataques.push(...HIPOTAMO_ATAQUES)

const CAPIBERO_ATAQUES = [
    { nombre: 'TIERRA 🌱', id: 'boton-tierra' },
    { nombre: 'TIERRA 🌱', id: 'boton-tierra' },
    { nombre: 'TIERRA 🌱', id: 'boton-tierra' },
    { nombre: 'AGUA 💧', id: 'boton-agua' },
    { nombre: 'FUEGO 🔥', id: 'boton-fuego' },
    { nombre: 'AIRE ⛅', id: 'boton-aire' },

]
capibero.ataques.push(...CAPIBERO_ATAQUES)


const RATIAJI_ATAQUES = [
    { nombre: 'TIERRA 🌱', id: 'boton-tierra' },
    { nombre: 'TIERRA 🌱', id: 'boton-tierra' },
    { nombre: 'AIRE ⛅', id: 'boton-aire' },
    { nombre: 'AIRE ⛅', id: 'boton-aire' },
    { nombre: 'AGUA 💧', id: 'boton-agua' },
    { nombre: 'FUEGO 🔥', id: 'boton-fuego' },
]
ratiaji.ataques.push(...RATIAJI_ATAQUES)


const COCOFIRE_ATAQUES = [
    { nombre: 'FUEGO 🔥', id: 'boton-fuego' },
    { nombre: 'FUEGO 🔥', id: 'boton-fuego' },
    { nombre: 'FUEGO 🔥', id: 'boton-fuego' },
    { nombre: 'AGUA 💧', id: 'boton-agua' },
    { nombre: 'TIERRA 🌱', id: 'boton-tierra' }, 
    { nombre: 'AIRE ⛅', id: 'boton-aire' },
]
cocofire.ataques.push(...COCOFIRE_ATAQUES)


const TUCAPALMA_ATAQUES = [
    { nombre: 'AIRE ⛅', id: 'boton-aire' },
    { nombre: 'AIRE ⛅', id: 'boton-aire' },
    { nombre: 'AIRE ⛅', id: 'boton-aire' },
    { nombre: 'AGUA 💧', id: 'boton-agua' },
    { nombre: 'FUEGO 🔥', id: 'boton-fuego' },
    { nombre: 'TIERRA 🌱', id: 'boton-tierra' },
]

tucapalma.ataques.push(...TUCAPALMA_ATAQUES)


const PYDOS_ATAQUES = [
    { nombre: 'AIRE ⛅', id: 'boton-aire' },
    { nombre: 'AIRE ⛅', id: 'boton-aire' },
    { nombre: 'AGUA 💧', id: 'boton-agua' },
    { nombre: 'AGUA 💧', id: 'boton-agua' },
    { nombre: 'FUEGO 🔥', id: 'boton-fuego' },
    { nombre: 'TIERRA 🌱', id: 'boton-tierra' },
]
pydos.ataques.push(...PYDOS_ATAQUES)


mokepones.push(hipotamo, capibero, ratiaji, cocofire, tucapalma, pydos)

function iniciarJuego () {
    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'
    sectionVerMapa.style.display = 'none'
    
    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src="${mokepon.foto}" alt=${mokepon.nombre}> 
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDeMokepones
        inputHipotamo = document.getElementById('Hipotamo')
        inputCapibero = document.getElementById('Capibero')
        inputRatiaji = document.getElementById('Ratiaji')
        inputCocofire = document.getElementById('Cocofire')
        inputTucapalma = document.getElementById('Tucapalma')
        inputPydos = document.getElementById('Pydos')
    })

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    
    botonReiniciar.addEventListener('click', reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch("http://192.168.0.9:8080/unirse")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador() {
    
    sectionSeleccionarAtaque.style.display = 'block'

    if (inputHipotamo.checked) {
        spanMascotaJugador.innerHTML = inputHipotamo.id
        document.getElementById('imagen-mascota-jugador').src = hipotamo.foto
        mascotaJugador = inputHipotamo.id
        
    } else if (inputCapibero.checked) {
        spanMascotaJugador.innerHTML = inputCapibero.id
        document.getElementById('imagen-mascota-jugador').src = capibero.foto
        mascotaJugador = inputCapibero.id
       
    } else if (inputRatiaji.checked) {
        spanMascotaJugador.innerHTML = inputRatiaji.id
        document.getElementById('imagen-mascota-jugador').src = ratiaji.foto
        mascotaJugador = inputRatiaji.id
       
    } else if (inputCocofire.checked) {
        spanMascotaJugador.innerHTML = inputCocofire.id
        document.getElementById('imagen-mascota-jugador').src = cocofire.foto
        mascotaJugador = inputCocofire.id
        
    } else if (inputTucapalma.checked) {
        spanMascotaJugador.innerHTML = inputTucapalma.id
        document.getElementById('imagen-mascota-jugador').src = tucapalma.foto
        mascotaJugador = inputTucapalma.id
       
    } else if (inputPydos.checked) {
        spanMascotaJugador.innerHTML = inputPydos.id
        document.getElementById('imagen-mascota-jugador').src = pydos.foto
        mascotaJugador = inputPydos.id
       
    } else  {
        alert ('Selecciona una mascota')
        return
    }

    sectionSeleccionarMascota.style.display = 'none'
    seleccionarMokepon(mascotaJugador)
    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
    
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://192.168.0.9:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques 
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id=${ataque.id} class= "boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorDeAtaques.innerHTML += ataquesMokepon
    })

        botonFuego = document.getElementById ('boton-fuego')
        botonAgua = document.getElementById ('boton-agua')
        botonTierra = document.getElementById ('boton-tierra')
        botonAire = document.getElementById ('boton-aire')
        botones = document.querySelectorAll('.BAtaque')
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (elemento) => {
            if (elemento.target.textContent === 'FUEGO 🔥') {
                ataqueJugador.push('FUEGO 🔥')
                boton.style.backdropFilter = 'blur(45px)';
                boton.disabled = true 
                
            } else if (elemento.target.textContent === 'AGUA 💧') {
                ataqueJugador.push('AGUA 💧')
                boton.style.backdropFilter = 'blur(45px)';
                boton.disabled = true
               
            } else if (elemento.target.textContent === 'TIERRA 🌱') {
                ataqueJugador.push('TIERRA 🌱')
                boton.style.backdropFilter = 'blur(45px)';
                boton.disabled = true
               
            } else {
                ataqueJugador.push('AIRE ⛅')
                boton.style.backdropFilter = 'blur(45px)';
                boton.disabled = true
                
            }
            //ataqueEnemigo()
            if (ataqueJugador.length === 6) {
                enviarAtaques()
            }
            //enviarAtaques()
            let index = (ataqueJugador.length -1)
            let emoteturno = combate(index)
            crearMensaje(emoteturno, index)
            if (ataqueJugador.length === 6) {
                revisarVidas()
            }
        })
    }) 
    
}

function enviarAtaques() {
    fetch(`http://192.168.0.9:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "applicaction/json"
        }, 
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://192.168.0.9:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ( { ataques }) {
                        if (ataques.lenght === 6) {
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}

function seleccionarMascotaEnemigo(enemigo) {

    spanMascotaEnemigo.innerHTML = enemigo.nombre
    document.getElementById('imagen-mascota-enemigo').src = enemigo.foto
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()

    /*let mascotaAleatoria = aleatorio(0, mokepones.length -1)

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
    document.getElementById('imagen-mascota-enemigo').src = mokepones[mascotaAleatoria].foto
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques
    secuenciaAtaque()*/
}

function ataqueEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length -1)

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueAleatorioEnemigo.push('FUEGO 🔥')
    } else if (ataqueAleatorio == 2 || ataqueAleatorio == 3) {
        ataqueAleatorioEnemigo.push('AGUA 💧')
    } else if (ataqueAleatorio == 4 || ataqueAleatorio == 5) {
       ataqueAleatorioEnemigo.push('TIERRA 🌱')
    } else {
        ataqueAleatorioEnemigo.push('AIRE ⛅')
    } 
}

/*function iniciarPelea() {
    if (ataqueJugador.length === 6) {
        combate()
    }
}

const resultados = {
    'FUEGO 🔥': { 
        'TIERRA 🌱': "VAS GANANDO 🎈", 
        'AGUA 💧': "VAS PERDIENDO 😢", 
        'AIRE ⛅': "VAS PERDIENDO 😢" },
    'AGUA 💧': { 
        'AIRE ⛅': "VAS GANANDO 🎈", 
        'FUEGO 🔥': "VAS GANANDO 🎈", 
        'TIERRA 🌱': "VAS PERDIENDO 😢" },
    'TIERRA 🌱': { 
        'AGUA 💧': "VAS GANANDO 🎈", 
        'AIRE ⛅': "VAS GANANDO 🎈", 
        'FUEGO 🔥': "VAS PERDIENDO 😢" },
    'AIRE ⛅': { 
        'FUEGO 🔥': "VAS GANANDO 🎈", 
        'AGUA 💧': "VAS PERDIENDO 😢", 
        'TIERRA 🌱': "VAS PERDIENDO 😢"}
    }*/

/*function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueAleatorioEnemigo[enemigo]
}*/
  
function combate(index) {
    clearInterval(intervalo)
    if(ataqueJugador[index] === ataqueAleatorioEnemigo[index]) {
    //condicionalDeEmote = crearMensaje("🤝")
    return "🤝"
    } else if (ataqueJugador[index] === 'FUEGO 🔥' && ataqueAleatorioEnemigo[index] === 'TIERRA 🌱') {
    //crearMensaje("GANASTE 🎈")
    victoriasJugador++;
    actualizarVidas(spanVidasJugador, victoriasJugador)
    return "🎈"
    } else if (ataqueJugador[index] === 'TIERRA 🌱' && ataqueAleatorioEnemigo[index] === 'AGUA 💧') {
    //crearMensaje("GANASTE 🎈");
    victoriasJugador++;
    actualizarVidas(spanVidasJugador, victoriasJugador)
    return "🎈"
    }  else if (ataqueJugador[index] === 'AGUA 💧' && ataqueAleatorioEnemigo[index] === 'AIRE ⛅') {
    //crearMensaje("GANASTE 🎈");
    victoriasJugador++;
    actualizarVidas(spanVidasJugador, victoriasJugador)
    return "🎈"
    }  else if (ataqueJugador[index] === 'AGUA 💧' && ataqueAleatorioEnemigo[index] === 'FUEGO 🔥') {
    //crearMensaje("GANASTE 🎈");
    victoriasJugador++;
    actualizarVidas(spanVidasJugador, victoriasJugador)
    return "🎈"
    } else if (ataqueJugador[index] === 'TIERRA 🌱' && ataqueAleatorioEnemigo[index] === 'AIRE ⛅') {
    //crearMensaje("GANASTE 🎈");
    victoriasJugador++;
    actualizarVidas(spanVidasJugador, victoriasJugador)
    return "🎈"
    } else if (ataqueJugador[index] === 'AIRE ⛅' && ataqueAleatorioEnemigo[index] === 'FUEGO 🔥') {
    //crearMensaje("GANASTE 🎈");
    victoriasJugador++;
    actualizarVidas(spanVidasJugador, victoriasJugador)
    return "🎈"
    } else {
    //crearMensaje("PERDISTE 😢");
    victoriasEnemigo++;
    actualizarVidas(spanVidasEnemigo, victoriasEnemigo)
    return "😢"
    } 
}
  
function actualizarVidas(span, victorias) {
    let iconos = ""
    if (victorias === 0) {
        span.innerHTML = "✍" 
    } else {
        for (let i = 0; i < victorias; i++) {
            iconos = "🏆" + iconos;
        }
        span.innerHTML = iconos;
    }
    
}

function revisarVidas() {
    /*if (vidasEnemigo == 0) {
        crearMensajeFinal("FELICITACIONES GANASTE 😀")
    } else if (vidasJugador == 0) {
        crearMensajeFinal("Lo siento, perdiste 😢")
    }*/
    if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("Esto fue un empate!!!")
    } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("FELICITACIONES GANASTE 😀")
    } else {
        crearMensajeFinal("Lo siento, perdiste 😢")
    }
}

function crearMensaje(emoteturno, index) {
    
    let nombretumascota = document.getElementById('mascota-jugador').innerHTML
    let nombremascotaenemigo = document.getElementById('mascota-enemigo').innerHTML
    
    let mensaje = document.createElement('p')
    //for (let index = 0; index < ataqueJugador.length; index++) { 
        let emoteNode = document.createElement("span")
        emoteNode.classList.add("emote-grande")
        emoteNode.innerHTML = emoteturno;
        mensaje.appendChild(emoteNode);
        mensaje.innerHTML += ' Tu ' + nombretumascota + ' atacó con ' + ataqueJugador[index] + ' y el enemigo ' + nombremascotaenemigo + ' atacó con ' + ataqueAleatorioEnemigo[index]
    //}

    cajamensajes.appendChild(mensaje)
    sectionmensajes.appendChild(mensaje)
    cajamensajes.setAttribute("class", "borde-caja-mensajes");  
}

function crearMensajeFinal(resultadoFinal) {
    
    let parrafo = document.createElement('p') 
    parrafo.innerHTML = resultadoFinal 
    sectionMensajes.appendChild(parrafo)

    sectionReiniciar.style.display = 'block'
   
    removerElegirAtaque.remove()
    cajamensajes.remove()
    contenedorDeAtaques.remove()
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random()* (max - min +1) + min)
}

function dibujarCanvas() {

    mokeponEnElMapa.x = mokeponEnElMapa.x + mokeponEnElMapa.velocidadX
    mokeponEnElMapa.y = mokeponEnElMapa.y + mokeponEnElMapa.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    
    mokeponEnElMapa.dibujarMokepon()
    //mokeponEnElMapa.style.border = "solid 2px red;"
    enviarPosicion(mokeponEnElMapa.x, mokeponEnElMapa.y)

    mokeponesEnemigos.forEach(function (mokepon) {
        mokepon.dibujarMokepon()
        revisarChoque(mokepon)
    }) 
    detenerEnBordesDelMapa()

}

function enviarPosicion(x, y) {
    fetch(`http://192.168.0.9:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
     .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function ({enemigos}) {
                    console.log(enemigos)
                    
                    mokeponesEnemigos = enemigos.map(function (enemigo) {
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if (mokeponNombre === "Hipotamo") {
                            mokeponEnemigo = new Mokepon('Hipotamo', './Mokepon imagen/hipotamso.png', 5, './Mokepon imagen/hipotamocabeza.png', enemigo.id)
                        } else if (mokeponNombre === "Capibero") {
                            mokeponEnemigo = new Mokepon('Capibero', './Mokepon imagen/noc.png', 5, './Mokepon imagen/capiberocabeza.png', enemigo.id)
                        } else if (mokeponNombre === "Ratiaji") {
                            mokeponEnemigo = new Mokepon('Ratiaji', './Mokepon imagen/ratiajiu.png', 5, './Mokepon imagen/ratiajicabeza.png', enemigo.id)
                        } else if (mokeponNombre === "Cocofire") {
                            mokeponEnemigo = new Mokepon('Cocofire', './Mokepon imagen/cocofire.png', 5, './Mokepon imagen/cocofirecabeza.png', enemigo.id)
                        } else if (mokeponNombre === "Tucapalma") {
                            mokeponEnemigo = new Mokepon('Tucapalma', './Mokepon imagen/Toucannon.png', 5, './Mokepon imagen/tucapalmacabeza.png', enemigo.id)
                        } else if (mokeponNombre === "Pydos") {
                            mokeponEnemigo = new Mokepon('Pydos', './Mokepon imagen/pypydos.png', 5, './Mokepon imagen/pipidos.png', enemigo.id)
                        }
                        

                        mokeponEnemigo.x = enemigo.x 
                        mokeponEnemigo.y = enemigo.y

                        return mokeponEnemigo
                    })
                    
                })
        }
     })
}

function moverDerecha() {
    mokeponEnElMapa.velocidadX = 5
}

function moverIzquierda() {
    
    mokeponEnElMapa.velocidadX = -5
}

function moverArriba() {
    
    mokeponEnElMapa.velocidadY = -5
}
function moverAbajo() {
    
    mokeponEnElMapa.velocidadY = 5
}

function detenerMovimiento() {
    
    mokeponEnElMapa.velocidadX = 0
    mokeponEnElMapa.velocidadY = 0
}

function sePresionoUnaTecla(event) {
    //sanguchito de if
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break
    }
}

function iniciarMapa() {
    sectionSeleccionarMascota.style.display = 'none'
    sectionSeleccionarAtaque.style.display = 'none'
    //mapa.width = 1100
    //mapa.height = 500
    mokeponEnElMapa = obtenerMokeponMapa(mascotaJugador)
    
    intervalo = setInterval(dibujarCanvas, 50)
    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerMokeponMapa() {
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i] //retorna mokepon elegido en el mapa
        }
    } 
}

function detenerEnBordesDelMapa() {
    // Verificar si las mascotas ya llegaron al borde del mapa
  
    const arribaMapa = 0;
    const abajoMapa = alturaBuscadaMapa - mokeponEnElMapa.alto;
    const derechaMapa = anchoDelMapa;
    const izquierdaMapa = 0;
  
    const arribaJugador = mokeponEnElMapa.y;
    const derechaJugador = mokeponEnElMapa.x + mokeponEnElMapa.ancho;
    const izquierdaJugador = mokeponEnElMapa.x;
  
    if (arribaJugador < arribaMapa) {
      mokeponEnElMapa.y = arribaMapa;
    }
  
    if (arribaJugador > abajoMapa) {
      mokeponEnElMapa.y = abajoMapa;
    }
  
    if (derechaJugador > derechaMapa) {
      mokeponEnElMapa.x = derechaMapa - mokeponEnElMapa.ancho;
    }
  
    if (izquierdaJugador < izquierdaMapa) {
      mokeponEnElMapa.x = izquierdaMapa;
    }
  
    
  }


function revisarChoque(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mokeponEnElMapa.y
    const abajoMascota = mokeponEnElMapa.y + mokeponEnElMapa.ancho
    const derechaMascota = mokeponEnElMapa.x + mokeponEnElMapa.ancho
    const izquierdaMascota = mokeponEnElMapa.x

    if(
        abajoMascota < arribaEnemigo || arribaMascota > abajoEnemigo || derechaMascota < izquierdaEnemigo || izquierdaMascota > derechaEnemigo
    ) {
        return
    } if(enemigo.x == undefined || enemigo.y == undefined){
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)

    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    alert("Tu mascota " + mokeponEnElMapa.nombre + " chocó contra " + enemigo.nombre + " enemigo. Empezará el combate!!!")
    enemigoId = enemigo.id
    seleccionarMascotaEnemigo(enemigo)
    
    //alert("Hay choque!!! " + enemigo.nombre)
}

window.addEventListener('load', iniciarJuego) 