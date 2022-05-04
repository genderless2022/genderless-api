const { Payment, Product } = require("../db");
const { Router } = require("express");
const axios = require("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const mercadopago = require("mercadopago");

// Agrega credenciales
mercadopago.configure({
  access_token:
    "TEST-2503076328251445-050203-c66d4a54bede70270b5eca5596dec5b3-1116297917",
});

router.post("/checkout", (req, res) => {
  /* lo que requiere por body
    {
        "name": ["pantalon", "jeans", "medias"],
        "picture_url": ["asdsa", "asdads", "asdasda"],
        "price": [23, 43, 12],
        "quantity": [1, 3, 3],
        "size": ["S", "XXL", "L"]
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
        title: data.name[i],
        picture_url: data.picture_url[i],
        description: data.size[i],
        unit_price: parseInt(data.price[i]),
        quantity: parseInt(data.quantity[i]),
      });
    }
  } else {
    preference.items.push({
      title: data.name,
      picture_url: data.picture_url,
      description: data.size,
      unit_price: parseInt(data.price),
      quantity: parseInt(data.quantity),
    });
  }
  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      console.log(response.response.init_point);
      res.redirect(response.response.init_point);
    })
    .catch(function (error) {
      console.log(error);
    });
});

//Ruta a la que debe pegar una vez redirecciona el pago finalizado
router.get("/success", async (req, res) => {
  const id = req.query.payment_id;

  const infoApi = await axios.get(
    "https://api.mercadopago.com/v1/payments/" + id,
    {
      headers: {
        Authorization:
          "Bearer  TEST-2503076328251445-050203-c66d4a54bede70270b5eca5596dec5b3-1116297917",
      },
    }
  );

  const infoTotal = {
    items: infoApi.data.additional_info.items.map((item) => {
      return {
        name: item.title,
        picture: item.picture_url,
        size: item.description,
        price: item.unit_price,
        quantity: item.quantity,
      };
    }),
    total_paid_amount: infoApi.data.transaction_details.total_paid_amount,
  };
  /* console.log(infoTotal); */

  if (infoTotal) {
    for (let i = 0; i < infoTotal.items.length; i++) {
      let aux = {
        name: infoTotal.items[i].name,
        picture: infoTotal.items[i].picture,
        size: infoTotal.items[i].size,
        price: infoTotal.items[i].price,
        quantity: infoTotal.items[i].quantity,
        total_paid_amount: infoTotal.total_paid_amount,
      };
      /* console.log(aux); */
      await Payment.create(aux);
    }
  }
  /* console.log(infoTotal); */

  for (let i = 0; i < infoTotal.items.length; i++) {
    const product = await Product.findOne({
      where: { name: infoTotal.items[i].name },
    });
    let stockChange = [];
    for (let j = 0; j < product.dataValues.stock_by_size.length; j++) {
      if (
        product.dataValues.stock_by_size[j].size === infoTotal.items[i].size
      ) {
        let stock = product.dataValues.stock_by_size[j].stock;
        stock = stock -= infoTotal.items[i].quantity;
        let newStock = { size: infoTotal.items[i].size, stock: stock };
        console.log(newStock);
        stockChange.push(newStock);
      } else {
        stockChange.push(product.dataValues.stock_by_size[j]);
      }
    }
    await Product.update(
      {
        stock_by_size: stockChange,
      },
      { where: { name: product.dataValues.name } }
    );
  }
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getProduct = require("./product.js");
router.use("/productos", getProduct);

const postUser = require("./user");
router.use("/usuario", postUser);

const getUsers = require("./user");
router.use("/usuarios", getUsers);

const getUserInfo = require("./user");
router.use("/usuario", getUserInfo);

const putUserInfo = require("./user");
router.use("/usuario", putUserInfo);

const putUserPassword = require("./user");
router.use("/usuario", putUserPassword);

const login = require("./user");
router.use("/usuario", login);

const logout = require("./user");
router.use("/usuario", logout);

const putUserRol = require("./user");
router.use("/usuario", putUserRol);

const deleteUser = require("./user");
router.use("/usuario", deleteUser);

const addProductToFavorites = require("./user.js");
router.use("/usuario", addProductToFavorites);

const getProductFromFavorites = require("./user.js");
router.use("/usuario", getProductFromFavorites);

const deleteProductFromFavorites = require("./user.js");
const { pause } = require("mercadopago/lib/resources/preapproval");
router.use("/usuario", deleteProductFromFavorites);

module.exports = router;
