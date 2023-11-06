const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashPassword = async password => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        console.log(error);
        return {
            msg: 'login failed please try again',
            error
        }
    }
}

const comparePassword = async (curPassword, prePassword) => {
    try {
        const result = await bcrypt.compare(curPassword, prePassword);
        return result;
    } catch (error) {
        console.log(error);
        return {
            msg: 'login failed please try again',
            error
        }
    }
}

const generateToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
    return token;
}


module.exports = { hashPassword, comparePassword, generateToken };