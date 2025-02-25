import express from 'express';
const router = express.Router();
router.get('/',(req,res) =>{
    res.render('index', {});
});

app.get('/',(req,res) =>{
    res.render('home', {products});
});

app.get('/realTimeProducts', (req,res) =>{
    res.render('realTimeProducts', {products});
});

export default router;