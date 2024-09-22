const socket = io();

//Crear productio via HTTP
app.post('/products', (req,res) => {
    const { product } = req.body;
    products.push(product);
    io.emit('updateProducts', products); //Emitir la lista actualizada
    res.redirect('/realtimeproducts');
});

//Eliminar producto via HTTP
app.post('/products/delete', (req,res) => {
    const { index } = req.boby;
    products.splice(index, 1);
    io.emit('updateProducts', products); // Emitir la lista actualizada
    res.redirect('/realtimeproducts');

});