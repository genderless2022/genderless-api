const data = require('./productList');
const preloaderProduct = require('./Controllers/ProductControllers/preloaderProduct');

module.exports = async function preloader() {

    data.map((p) => preloaderProduct(p));
    console.log('Productos Pre-Cargados');

};