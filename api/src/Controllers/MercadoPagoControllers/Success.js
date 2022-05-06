const { Payment, Product } = require("../../db");
const axios = require("axios");
const auth = require("../../Middleware/roleAuth")

const paymentSuccess = async (req, res) => {
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
  /* console.log(infoApi); */
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
    status: infoApi.data.status,
    status_detail: infoApi.data.status_detail,
  };
  console.log(infoApi.data.additional_info.items);
//---------------------------------------------


/* logica con token de usuario */


//---------------------------------------------
  if (infoTotal) {
    for (let i = 0; i < infoTotal.items.length; i++) {
      let aux = {
        name: infoTotal.items[i].name,
        picture: infoTotal.items[i].picture,
        size: infoTotal.items[i].size,
        price: infoTotal.items[i].price,
        quantity: infoTotal.items[i].quantity,
        total_paid_amount: infoTotal.total_paid_amount,
        status: infoTotal.status,
        status_detail: infoTotal.status_detail,
        status_delivery: "En preparacion",
        email: "lochicosdelgender@gmail.com"
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
        /* console.log(newStock); */
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
};

module.exports = paymentSuccess;
