const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const mercadopago = require('mercadopago');

// Agrega credenciales
mercadopago.configure({
    access_token: "TEST-2503076328251445-050203-c66d4a54bede70270b5eca5596dec5b3-1116297917",
})

router.post("/checkout", (req, res) => {
    /* lo que requiere por body
    {
        "name": ["pantalon", "jeans", "medias"],
        "picture_url": ["asdsa", "asdads", "asdasda"],
        "price": [23, 43, 12],
        "quantity": [1, 3, 3]
    } 
    */
    const data = req.body;
    /* console.log(data); */
    /* crea un objeto de preferencia */
    let preference = {
        items: [],
        back_urls: {
            success: "http://localhost:3000/success",
            failure: "http://localhost:3000",
            pending: "http://localhost:3000",
        },
        auto_return: "approved",
        statement_descriptor: "GENDERLESS",
        shipments: {
            cost: 0,
            mode: "not_specified",
        },

    };

    if (Array.isArray(data.name)) {
        for (let i = 0; i < data.name.length; i++) {
            preference.items.push({
                name: data.name[i],
                picture_url: data.picture_url[i],
                unit_price: parseInt(data.price[i]),
                quantity: parseInt(data.quantity[i]),
            });
        }
    } else {
        preference.items.push({
            name: data.name,
            picture_url: data.picture_url,
            unit_price: parseInt(data.price),
            quantity: parseInt(data.quantity),
        });
    }
    mercadopago.preferences
        .create(preference)
        .then(function (response) {
            res.redirect(response.response.init_point);
        })
        .catch(function (error) {
            console.log(error);
        });

})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getProduct = require('./product.js');
router.use("/productos", getProduct);

const postUser = require('./user');
router.use('/usuario', postUser);

const getUsers = require('./user');
router.use('/usuarios', getUsers);

const getUserInfo = require('./user');
router.use('/usuario', getUserInfo);

const putUserInfo  = require('./user');
router.use('/usuario', putUserInfo);

const putUserPassword = require('./user');
router.use('/usuario', putUserPassword);

const login = require('./user');
router.use('/usuario', login);

const logout = require('./user');
router.use('/usuario', logout);

const putUserRol = require('./user');
router.use('/usuario', putUserRol);

const deleteUser = require('./user');
router.use('/usuario', deleteUser);


const addProductToFavorites = require('./user.js');
router.use('/usuario', addProductToFavorites);

const getProductFromFavorites = require('./user.js');
router.use('/usuario', getProductFromFavorites);

const deleteProductFromFavorites = require('./user.js');
router.use('/usuario', deleteProductFromFavorites);



module.exports = router;
