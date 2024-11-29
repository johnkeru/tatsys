const Router = require('express').Router
const { setRolesAndAssign } = require('../static/set_roles_and_super_admin')

const setterDataRouter = Router()

// CALL THIS WHEN NEED TO SAVE/UPDATE THE ROLES OR NEW ADMIN ADDED.
// IN PRODUCTION CALL THIS ONCE. AND REMOVE THIS FILL OR COMMENT EVERYTHING HERE.
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
