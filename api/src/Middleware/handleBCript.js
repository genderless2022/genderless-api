const bcrypt = require('bcryptjs');

const encrypt = async (textPlain) => {
    try {
        const hash = await bcrypt.hash(textPlain, 10);
        return hash;
    } catch (error) {
        console.log(error);
    }
}

const compare = async (textPlain, hashPass) => {
    try {
        return await bcrypt.compare(textPlain, hashPass);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {encrypt, compare};