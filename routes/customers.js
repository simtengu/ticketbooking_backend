const express = require('express');
const Region = require("../models/region")
const { roles: { admin, hod, student } } = require("../config");
const { fetchTickets, fetchRoute, saveTicket } = require('../controllers/customerOperations');
const { authVerification } = require('../middlewares');
const router = express.Router();

const getRegions = async (req, res) => {
    const regions = await Region.find({});
    res.status(200).json({ regions })
}

router.get("/regions", getRegions)
router.get("/tickets/route", fetchRoute)
router.route("/tickets").get(fetchTickets).post(authVerification,saveTicket)


module.exports = router