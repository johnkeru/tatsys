const Router = require('express').Router
const { setRolesAndAssign } = require('../static/set_roles_and_super_admin')

const setterDataRouter = Router()

// PLEASE ONLY CALL THIS ONCE!
setterDataRouter.get('/setData', async (req, res) => {
    try {
        const message1 = await setRolesAndAssign() // good
        res.json({
            message1,
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: e.message })
    }

})

module.exports = setterDataRouter