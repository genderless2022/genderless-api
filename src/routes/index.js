const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', (req, res)=>{
    res.send('hola mundo')
})

router.get('/productos', (req, res)=>{
    res.send('aqui van los productos')
})

router.get('/marcas', (req, res)=>{
    res.send('aqui va la id de los productos')
})

router.get('/detalles', (req, res)=>{
    res.send('aqui va la id de los productos')
})

module.exports = router;
