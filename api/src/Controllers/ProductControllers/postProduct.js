const {Product, Category } = require("../../db.js");

const runNews = require("../../utils/usuariosNews.js")

const postProduct = async (req, res, next) => {
  const {
    name,
    description,
    stock_by_size,
    price,
    discount,
    image,
    brand,
    disabled,
    category,
  } = req.body;
  
  try {
    let productCreated = await Product.create({
      name,
      description,
      stock_by_size,
      price,
      discount,
      image,
      brand,
      disabled,
      category,
    });

    try {
      await Category.create({ name: category });
    } catch (error) {
      console.log("categoryExists" + error);
    }

    let categoryCreated = await Category.findOne({ where: { name: category } });
    await categoryCreated.addProduct(productCreated);
    
    runNews(productCreated.name, productCreated.image, productCreated.description, productCreated.price, productCreated.discount);

    res.status(201).json({ msg: "Product created correctly with id", id: productCreated});
  } catch (error) {
    console.log("Post Error" + error);
    
  }
};

module.exports = postProduct;
