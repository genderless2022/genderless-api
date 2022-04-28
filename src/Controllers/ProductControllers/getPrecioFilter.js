const { Product, Category } = require("../../db.js");

const productByPrice = async (req, res) => {
    const { price } = req.params
    console.log(price);
    if (price === "ASC") {
        try {
          const productsPrice = await Product.findAll({
            order: [
                ['price', 'ASC']
            ],
          include: [{ model: Category }]
          });
          res.status(200).send(productsPrice);
        } catch (error) {
          res.send(error);
        }
    }else if(price === "DESC"){
        try {
            const productsPrice = await Product.findAll({
              order: [
                  ['price', 'DESC']
              ],
            include: [{ model: Category }]
            });
            res.status(200).send(productsPrice);
          } catch (error) {
            res.send(error);
          }
    }
};

module.exports = productByPrice;
