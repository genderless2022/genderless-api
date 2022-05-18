const {Product} = require ('../../db');
const runTags = require('../../utils/tagusuarios')
const runNews = require("../../utils/usuariosNews.js")

const putProduct = async (req, res, next) => {
    const {id, description,stock_by_size, price, discount, image, brand, disabled, category } = req.body;
    console.log(id, 'putprod')

    const allProducts = await Product.findAll();
    if (allProducts.length){
        try {
            const result = await Product.update({description, stock_by_size, price, discount, image, brand, disabled, category},
                {where: {
                    id: id,
                    
                }},
            )

            const product = await Product.findOne({where: {id}})
            
            runTags(product.dataValues.name, product.dataValues.image, product.dataValues.description, product.dataValues.price, product.dataValues.discount)
            runNews(product.dataValues.name, product.dataValues.image, product.dataValues.description, product.dataValues.price, product.dataValues.discount)
            
            res.status(200).json({msg: 'Producto actualizado'});
        } catch (error) {
            next(error);
        }
    } else {
        res.status(400).json({msg: 'No hay productos almacenados en la base de datos'});
    }
}

module.exports = putProduct;