const mercadopago = require("mercadopago");

// Agrega credenciales
mercadopago.configure({
  access_token:
    "TEST-2503076328251445-050203-c66d4a54bede70270b5eca5596dec5b3-1116297917",
});

const createPreference = (req, res) => {
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
      failure: "http://localhost:3000/home",
      pending: "http://localhost:3000/success",
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
};

module.exports = createPreference;
