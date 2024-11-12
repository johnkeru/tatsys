module.exports = async (req, res, next) => {
    try {
        const { id } = req.body
        const role = await role.findById(id);
        if (role.name === 'USER ADMIN') return next()
        else res.status(403).json({ error: 'Forbidden' });
    } catch (e) {
        console.log(e)
        res.status(500).json({ error: 'Server error' });
    }
}