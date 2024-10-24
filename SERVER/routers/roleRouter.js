const { getRoles, createRole, updateRole, deleteRole, assignRoles } = require('../controllers/roleController')
const { setRolesAndAssign } = require('../static/setRolesAndSuperAdmin');

const Router = require('express').Router

const roleRouter = Router()

roleRouter.get('/roles', getRoles)
roleRouter.post('/create-role', createRole)
roleRouter.put('/update-role/:id', updateRole)
roleRouter.delete('/delete-role/:id', deleteRole)
roleRouter.post('/assign-role', assignRoles)

// set roles and assign roles. PLEASE ONLY CALL THIS ONCE!
roleRouter.get('/set-roles-and-assign', setRolesAndAssign)

module.exports = roleRouter