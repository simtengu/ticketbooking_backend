const express = require('express');
const { fetchDashboardDetails } = require('../controllers/admin');
const { getBuses, registerBus, busPicUpload, uploadBusPicture ,deleteBusImage, updateBus, deleteBus} = require('../controllers/admin/buses');
const { registerRegion, updateRegion, deleteRegion } = require('../controllers/admin/regions');
const { updateRoute, deleteRoute, getAllRoutes, saveRoute } = require('../controllers/admin/routes');
const { fetchUsers, searchUser, fetchMessages, deleteUser } = require('../controllers/admin/users');
const router = express.Router();
//users routes.................
router.get('/users',fetchUsers)
router.get('/users/search',searchUser)
router.delete('/user/:userId', deleteUser)
//regions routes...........
router.route("/regions").post(registerRegion)
router.route('/region/:id').patch(updateRegion).delete(deleteRegion)
//routes routes.............................. 
router.route("/routes").get(getAllRoutes).post(saveRoute)
router.route("/route/:routeId").patch(updateRoute).delete(deleteRoute)
//messages........
router.get("/messages",fetchMessages)
//dashboard.................... 
router.get("/dashboard/details",fetchDashboardDetails)
//buses............
router.get('/buses',getBuses)
router.post('/register_bus',registerBus)
router.patch("/bus/update/:busId",updateBus)
router.delete("/bus/delete/:busId",deleteBus)
//bus image..........
router.post('/bus/image_upload',uploadBusPicture.single('picture'),busPicUpload)
router.delete("/bus/image/:image_name",deleteBusImage)
module.exports = router