const express = require("express")
//importamos express js para utilizarlo en nuestro proyecto

const cors = require("cors") //libreria para que no haya errores de acceso como el de control allow origin
const app = express()
//creamos una aplicación con express js

app.use(express.static('public'))
app.use(cors()) //esto para que se use la libreria cors
app.use(express.json()) //parentesis dentro del parentesis porque son funciones. Json para que se habiliten las peticiones json

const jugadores = [] //variable con lista de jugadores

class Jugador {
    constructor(id) {
        this.id = id
    }
    asignarMokepon(mokepon) {
        this.mokepon = mokepon
    }
    actualizarPosicion(x, y) {
        this.x = x
        this.y = y
    }
    asignarAtaques(ataques) {
        this.ataques = ataques
    }
}

class Mokepon {
    constructor(nombre) {
        this.nombre = nombre
    }
}

app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`

    const jugador = new Jugador(id)
    
    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin", "*") //el asterisco es que cualquier origen es valido a ingresar al servidor, es inseguro pero es nuestra solución por ahora

    res.send(id)
}) //le decimos a express js que cuando reciba una petición responda

app.post("/mokepon/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
 //para acceder a la variable jugadorId, si no llegara a existir esta variable agrego el "" para asginar un valor aunque sea vacio//
    const nombre = req.body.mokepon || ""
    const mokepon = new Mokepon(nombre)
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokepon(mokepon)
    }
    console.log(jugadores)
    console.log(jugadorId)
    res.end() //para que la pagine no se quede cargando por 90 años//
}) //peticion post porq usaremos datos en json

app.post("/mokepon/:jugadorId/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x, y)
    }

    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id) 

    res.send({
        enemigos
    })

})


app.post("/mokepon/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const ataques = req.body.ataques || []
    
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarAtaques(ataques)
    }
    
    res.end() 
})

app.get("/mokepon/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const jugador = jugadores.find((jugador) => jugador.id === jugadorId)
    res.send({
        ataques: jugador.ataques || []
    })
})

app.listen(8080, () => {
    console.log("servidor funcionando")
}) //le decimos que en el puerto 8080 escuche las peticiones de nuestros clientes para que pueda respondernos continuamente