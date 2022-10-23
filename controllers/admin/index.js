const Region = require("../../models/region")
const User = require("../../models/user")
const Ticket = require("../../models/ticket")
const Message = require("../../models/message")
const Bus = require("../../models/bus")








const fetchDashboardDetails = async (req, res) => {

    //today's booked tickets section..............................
    let filterOptions = {}
    let todayStr;
    let theNextDayString;


    //today....................
    const dt = new Date()
    const theDay = dt.toLocaleDateString()
    const theDayArray = theDay.split("/")

    const theDate = parseInt(theDayArray[1])
    const month = theDayArray[0]
    const year = theDayArray[2]
    //tomorow(next date)................
    const forNextDayDt = new Date()

    const tomorowStr = forNextDayDt.setDate(forNextDayDt.getDate() + 1)

    let tomorowDt = new Date(tomorowStr)

    const theNextDay = tomorowDt.toLocaleDateString()
    const theNextDayArray = theNextDay.split("/")
    const theNextDate = parseInt(theNextDayArray[1])
    const theNextDayMonth = theNextDayArray[0]
    const theNextDayYear = theNextDayArray[2]

    todayStr = `${year}-${month}-${theDate}`
    theNextDayString = `${theNextDayYear}-${theNextDayMonth}-${theNextDate}`
    //adding createdAt field to filter options...............
    filterOptions.createdAt = { $gte: todayStr, $lt: theNextDayString }
    //end of today's booked tickets section..............................


    const rs = await Promise.all([User.find({}).countDocuments(), Message.find({}).countDocuments(), Region.find({}).countDocuments(), Ticket.find({}).countDocuments(), Bus.find({}).countDocuments(), Ticket.find(filterOptions).sort("-createdAt")])
    const agg = await Ticket.aggregate([{ $match: { price: { $gte: 1 } } }, {
        $group: {
            _id: null, total: {
                $sum: "$price"
            }
        }
    }])

   
    const users = rs[0]
    const messages = rs[1]
    const regions = rs[2]
    const tickets = rs[3]
    const buses = rs[4]
    const todayTickets = rs[5]
    const income = agg.length > 0 ?   agg[0].total : 0
    res.status(200).json({ users, tickets, messages, regions, buses, income, todayTickets })
}

module.exports = { fetchDashboardDetails }