const { Product } = require("../../db");

const stockRestored = async (req, res) => {
  const { id, quantity, size } = req.body;

  const product = await Product.findOne({
    where: { id: id },
  });

  const productCorrect = product.stock_by_size.map((elem) => {
    if (elem.size === size) {
      let stock = {
        size: size,
        stock: elem.stock + quantity,
      };
      return stock;
    } else return elem;
  });

/*   console.log(productCorrect); */

  await Product.update(
    {
      stock_by_size: productCorrect,
    },
    { where: { id: id } }
  );
  res.send("restaurado");
};

module.exports = stockRestored;
