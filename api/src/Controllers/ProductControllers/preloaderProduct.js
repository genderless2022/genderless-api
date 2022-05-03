const { Product, Category } = require('../../db.js');

const preloaderProduct = async (producto) => {
    try {
        const productCreated = await Product.create(producto);
        try {
            await Category.findOrCreate({
                    where: { name: producto.category }
                });
            }
            catch (err) {
                console.log(err);
            }

        const categoryCreated = await Category.findOne({ where: { name: producto.category } });
        await categoryCreated.addProduct(productCreated);
    }
    catch (error) {
        console.log(error);
    }
};

module.exports = preloaderProduct;
