const assignedRole = require('../models/assignedRole')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const tokenApi = process.env.ACCOUNT_TOKEN_API_URL;
        const clientId = process.env.CLIENT_ID;
        const ownerId = process.env.OWNER_ID;
        const encodedCredentials = Buffer.from(`${clientId}:${ownerId}`).toString('base64');

        // Make the API request to get the credentials
        const credentials = await (await fetch(tokenApi, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${encodedCredentials}`
            },
            body: new URLSearchParams({
                grant_type: 'password',
                username,
                password
            })
        })).json();

        // Set the access_token as a cookie
        const accessToken = credentials.access_token;
        // jwt time unit is seconds
        const jwtToken = jwt.sign({ accessToken }, process.env.JWT_SECRET_KEY, { expiresIn: credentials.expires_in * 2 })

        // cookie time unit is milliseconds
        res.cookie('jwtToken', jwtToken, {
            httpOnly: true, // To prevent access from JavaScript
            secure: true,   // Set true if you are using https
            maxAge: credentials.expires_in * 1000  // Set the cookie expiration
        });

        // Return ok
        res.sendStatus(200)

    } catch (e) {
        console.error(e)
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getUser = async (req, res) => {
    try {
        let roles = []
        const user = req.user
        let responseBody = null
        const assignedRoles = await assignedRole.findOne({ user: user.Username[0] }).populate({ path: 'roles', select: 'name' })
        assignedRoles?.roles.forEach(role => roles.push(role.name))
        if (assignedRoles) responseBody = { ...user, Roles: roles } // override the Roles by FMIS own roles
        else responseBody = { ...user, Roles: [] } // override the Roles by FMIS own roles
        res.json({ user: responseBody })
    } catch (e) {
        console.error(e)
        res.json({ error: 'Server error' })
    }
}

exports.logout = (req, res) => {
    res.clearCookie('jwtToken');
    res.status(200).json({ message: 'Logged out successfully' });
};