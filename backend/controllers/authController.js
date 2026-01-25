const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const { email, password } = req.body;

    // Hardcoded credentials as requested
    const ADMIN_EMAIL = 'pathlaiya123@gmail.com';
    const ADMIN_PASS = 'pathlaiya@123';

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASS) {
        return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create JWT payload
    const payload = {
        user: {
            id: 'admin',
            role: 'admin'
        }
    };

    // Sign Token
    jwt.sign(
        payload,
        process.env.JWT_SECRET || 'secret_key_binisha',
        { expiresIn: '5h' },
        (err, token) => {
            if (err) throw err;
            res.json({ token });
        }
    );
};
