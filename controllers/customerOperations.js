const Ticket = require("../models/ticket")
const User = require("../models/user")
const Route = require("../models/route");
const Message = require("../models/message");
const pdf = require("html-pdf")
var fs = require('fs');
var ticketTemplate = fs.readFileSync(`${__dirname}/../documents/ticketTemplate.html`, 'utf8');
var options = { format: 'Letter' };
const path = require('path')

// const ticketTemplate = require("../documents/ticketTemplate")
const { NotFoundError, BadRequestError } = require("../errors");



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
    const { fromRegion, toRegion, departingDate, rangeLimit, page, activeOnly, inActiveOnly } = req.query;
    let dptInt = departingDate ? parseInt(departingDate) : "000"
    let rangeLimitInt = rangeLimit ? parseInt(rangeLimit) : "000"

    let filterOptions = {}
    let theDayString;
    let theNextDayString;

    if (fromRegion) filterOptions.from = fromRegion;
    if (toRegion) filterOptions.to = toRegion;
    if (departingDate) {
        //departing date details....................
        const dt = new Date(dptInt)
        const theDay = dt.toLocaleDateString()
        const theDayArray = theDay.split("/")

        const theDate = parseInt(theDayArray[1])
        const month = theDayArray[0]
        const year = theDayArray[2]
        //the day after departing date details................
        const forNextDayDt = new Date(dptInt)

        const nextDayString = forNextDayDt.setDate(forNextDayDt.getDate() + 1)
        //assigning limit for tickets fetching(either the date specified for range filter or a next day for a date filter)
        let theNextDayDt = rangeLimit ? new Date(rangeLimitInt) : new Date(nextDayString)

        const theNextDay = theNextDayDt.toLocaleDateString()
        const theNextDayArray = theNextDay.split("/")
        const theNextDate = parseInt(theNextDayArray[1])
        const theNextDayMonth = theNextDayArray[0]
        const theNextDayYear = theNextDayArray[2]

        theDayString = `${year}-${month}-${theDate}`
        theNextDayString = `${theNextDayYear}-${theNextDayMonth}-${theNextDate}`
        //adding departing date to filter options...............
        filterOptions.departingDate = { $gte: theDayString, $lt: theNextDayString }

    }

    //for active tickets filter...............
    if (activeOnly) {
        const currentTime = new Date()
        const currentTimeString = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}`
        filterOptions.departingDate = { $gte: currentTimeString }
    }

    //for inActive only tickets filter...............
    if (inActiveOnly) {
        const currentTime = new Date()
        const currentTimeString = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}`
        filterOptions.departingDate = { $lt: currentTimeString }
    }

    let tickets = []
    let count;
    //pagination......................... 
    if (page) {
        let limit = 30
        let skip = (page - 1) * limit
        count = await Ticket.find(filterOptions).countDocuments()
        tickets = await Ticket.find(filterOptions).skip(skip).limit(limit).sort("-departingDate")
    } else {
        tickets = await Ticket.find(filterOptions).sort("departingDate")
        count = tickets.length
    }

    res.status(200).json({ tickets, count })
}

//download ticket ................... 
const ticketPdfGeneration = async (req, res) => {
    const tiketi = req.body;


    pdf.create(ticketTemplate, options).toFile(`${tiketi}.pdf`, (err) => {
        if (err) {
            console.log(err)
            return Promise.reject("couldn't create a pdf file..")
        }
        return Promise.resolve()
    })


    res.sendStatus(201)
}

const downloadTicket = async (req, res) => {
    const { ticketName } = req.query
    if (!ticketName) throw BadRequestError("no pdf name passed")
    res.sendFile(`${__dirname}/../${ticketName}.pdf`)

    // res.sendFile(path.join(__dirname, "/../documents/", `${ticketName}.pdf`))
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

//SEND MESSAGE..................
const sendMessage = async (req, res) => {
    await Message.create(req.body)
    res.sendStatus(201)
}




module.exports = { saveTicket, fetchTickets, postponeTicket, fetchRoute, downloadTicket, ticketPdfGeneration, sendMessage }


