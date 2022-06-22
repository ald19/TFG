const bcryptjs = require('bcryptjs');

async function encryptPassword(password){
    const salt = await bcryptjs.genSalt(10);

    return bcryptjs.hash(password, salt);
}

function validatePassword(password, passwordDB){
    return bcryptjs.compare(password, passwordDB);
}

module.exports = {
    encryptPassword,
    validatePassword
}