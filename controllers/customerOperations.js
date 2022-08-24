const Ticket = require("../models/ticket")
const User = require("../models/user")
const Route = require("../models/route");
const { NotFoundError } = require("../errors");
const ticket = require("../models/ticket");


//TICKET RELATED OPERATIONS........................
const saveTicket = async (req, res) => {
    const data = req.body;
    const userId = req.user.id;
    let tickets = await Ticket.insertMany(data.tickets)
    //update user(owner of the booked tickets).....adding tickets IDs 
    ticketsIds = tickets.map(ticket => ticket._id)
    await User.findByIdAndUpdate(userId, { $push: { tickets: { $each: ticketsIds } } })

    res.status(201).json({ tickets })
}


//fetch  tickets (filtered).................
const fetchTickets = async (req, res) => {
    const { fromRegion, toRegion, departingDate } = req.query;
    let dptInt = parseInt(departingDate)

    let filterOptions = {}
    if (fromRegion) filterOptions.from = fromRegion;
    if (toRegion) filterOptions.to = toRegion;

    const theDay = new Date(dptInt).toLocaleDateString()
    const theDayArray = theDay.split("/")

    let theDate = parseInt(theDayArray[1])
    let theNextDate = theDate + 1
    let month = theDayArray[0]
    let year = theDayArray[2]

    // let nextDayString = theDay.setDate(theDay.getDate() + 1)
    // let theNextDay = new Date(nextDayString)
    let theDayString = `${year}-${month}-${theDate}`
    let theNextDayString = `${year}-${month}-${theNextDate}`

    // console.log("theDate",theDayString )
    // console.log("theNextDate",theNextDayString )

    if (departingDate) filterOptions.departingDate = { $gte: theDayString, $lt: theNextDayString }

    // ISODate(departingDate);
    const tickets = await Ticket.find(filterOptions);
    res.status(200).json({ tickets })
}


//postponement of a ticket
const postponeTicket = async (req, res) => {

    res.status(200).json({ message: "ticket postponed" })
}

//ROUTE REALTED OPERATIONS....................
const fetchRoute = async (req, res) => {
    const { fromRegion, toRegion } = req.query;
    let filterOptions = {}

    if (fromRegion) filterOptions.from = fromRegion;
    if (toRegion) filterOptions.to = toRegion;

    const route = await Route.findOne(filterOptions);
    if (!route) throw new NotFoundError("The route specified wasn't found..")

    res.status(200).json({ route })

}






module.exports = { saveTicket, fetchTickets, postponeTicket, fetchRoute }


