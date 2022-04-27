const data = require('./productList');
const getProduct = require('./Controllers/ProductControllers/getProduct')

module.exports = async function preloader() {

    data.map((p) => getProduct(p));
    console.log('Productos Pre-Cargados');

};