module.exports = async (req, res, next) => {
    const token = req.cookies?.access_token
    if (!token) return res.json({ error: 'Access denied. No token provided.' })
    try {
        const res = await fetch(process.env.ACCOUNT_USER_API_URL, {
            headers: { Authorization: `Bearer ${token}` }
        })
        if (!res.ok) return res.json({ error: 'Access denied' })
        const user = await res.json()
        req.user = user
        next()
    } catch (e) {
        return res.json({ error: 'Access denied' })
    }
}