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



module.exports = router;
