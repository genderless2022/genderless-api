const generatePassword = (num) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789¡!#$%&/()=?¿*+-_.:,;<>';
    let result = '';
    for (let i = 0; i < num; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    };
    return result;
};

module.exports = generatePassword;