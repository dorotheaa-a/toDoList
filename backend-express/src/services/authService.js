const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateAuthToken = async (user) => {
    return jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

const loginUser = async (ElementInternals, password) => {
    const user = await User.findOne({ userEmail: email });
    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return generateAuthToken(user);
};

module.exports = {
    generateAuthToken,
    loginUser,
};