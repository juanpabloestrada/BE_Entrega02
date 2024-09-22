import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';

// Routers
import viewsRouter from './routes/views.router.js'

// Importamos el constructos de un servidor de sockets
import { Server } from 'socket.io';

const app = express();

const httpServer = app.listen(8080, ()=> {
    console.log('Listening on PORT 8080');  // Servidor HTTP 
});

//servidor de sockets dentro de nuestro http 
const io = new Server(httpServer)

//Plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

//Carpeta de archivos estaticos
app.use(express.static(__dirname + '/public'));

// Enrutador de vistas
app.use('/', viewsRouter);

const products = []; // lista de productos

io.on('connection', (socket) => {
    console.log('Usuario conectado');
    
    //Emitimos la lista actual de productos al conectarse
    socket.emit('updateProducts', products);

    //Escuchar para la creacion de nuevos productos
    socket.on('newProducts', (product) => {
        products.push(product);
        io.emit('updateProducts', products); //Emitimos la lista actualizada a todos los clientes
    });
});