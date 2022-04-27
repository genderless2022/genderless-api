const { Product, Category } = require('../../db.js')
const postProduct = async (req, res, next) => {

    const { name, description, stock_by_size, price, discount, image} = req.body

    try {
        let productCreated = await Product.create({name, description, stock_by_size, price, discount, image});

        try {
            await Category.create({ name: category })
            }
            catch (error) {
                console.log('categoryExists' + error);
            }

        let categoryCreated = await Category.findOne({where: {name: category}})
        await categoryCreated.addProduct(productCreated) 

        res.status(201).json({ msg: 'Product created correctly with id', id: productCreated })
    }
    catch(error){
        console.log('Post Error' + error)
    }
};
module.exports = postProduct;
