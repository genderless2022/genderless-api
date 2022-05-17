const { Payment, Product } = require("../../db");
const axios = require("axios");
var req_id = 1

const paymentSuccess = async (req, res) => {
  const {payment_id, email, objeto} = req.query;
/* console.log(payment_id, email, objeto); */

  const infoApi = await axios.get(
    "https://api.mercadopago.com/v1/payments/" + payment_id,
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
        status_delivery: "Creada",
        email: "cambiamosporgender@gmail.com",
        type_delivery: "objeto",
        price_unit: infoTotal.items[i].price * infoTotal.items[i].quantity,
        order_id: req_id
      };
      
      /* console.log(aux); */
      await Payment.create(aux);
    }
  }
  /* console.log(infoTotal); */
  req_id += 1;
  try {
    infoTotal.items.map(async (pro) => {
      const product = await Product.findOne({
        where: { name: pro.name },
      });
      /* console.log(product.sales, pro.quantity ); */
      const salesNum = Number(product.sales) + Number(pro.quantity);
      const stockChange = product.dataValues.stock_by_size.map((elem) => {
        if (elem.size === pro.size) {
          let stock = {
            size: pro.size,
            stock: elem.stock - pro.quantity,
          };
          return stock;
        } else return elem;
      });
      /* console.log(salesNum); */
      await Product.update(
        {
          sales: salesNum,
          stock_by_size: stockChange,
        },
        { where: { name: product.dataValues.name } }
      );
      /* console.log("logrado"); */
    });
  } catch (error) {
    res.status(404).send(error)
  }
};

module.exports = paymentSuccess;

/* agregar en la tabla payment una nueva columna que direccion del usuario y relacionar la tabla payment con
la tabla de usuarios*/
