const { Product } = require("../../db");
const { Op } = require("sequelize");

const productsSell = async(req, res) => {
    const products = await Product.findAll({
        limit: 5,
        where: {
            sales: {
                [Op.ne]: 0,
            },
        },
        order: [["sales", "DESC"]]
    })
    res.send(products)
}

module.exports = productsSell;