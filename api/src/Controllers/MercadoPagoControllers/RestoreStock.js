const { Product } = require("../../db");

const stockRestored = async (req, res) => {
  const { name, quantity, size } = req.body;

  const product = await Product.findOne({
    where: { name: name },
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
    { where: { name: name } }
  );
  res.send("restaurado");
};

module.exports = stockRestored;
