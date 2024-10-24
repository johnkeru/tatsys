const crypto = require('crypto');

exports.setJWTsecretKey = (req, res) => {
    // Generate a secure secret key using crypto
    const secretKey = crypto.randomBytes(64).toString('hex');
    // Respond with success message (avoid sending the secret key in response in real apps)
    res.status(200).json({ secretKey });
};
