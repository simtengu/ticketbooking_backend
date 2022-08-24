const express = require('express');
const { registerRegion, updateRegion, deleteRegion } = require('../controllers/admin/regions');
const { updateRoute, deleteRoute, getAllRoutes, saveRoute } = require('../controllers/admin/routes');
const { fetchUsers, searchUser } = require('../controllers/admin/users');
const router = express.Router();
//users routes.........
router.get('/users',fetchUsers)
router.get('/users/search',searchUser)
//regions routes...........
router.route("/regions").post(registerRegion)
router.route('/region/:id').patch(updateRegion).delete(deleteRegion)
//routes routes.............................. 
router.route("/routes").get(getAllRoutes).post(saveRoute)
router.route("/route/:routeId").patch(updateRoute).delete(deleteRoute)

module.exports = router