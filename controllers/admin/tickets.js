const Ticket = require("../../models/ticket")

//filter tickets by various categories..(date,date range,etc).....
const fetchTickets = async (req, res) => {
    const tickets = []
    res.status(200).json({ message: tickets })
}

//handleing of tickets postponed by customers.............
const handleTicketPostponement = async (req, res) => {

    res.status(200).json({ message: "ticket postponed" })
}



module.exports = { fetchTickets, handleTicketPostponement }


