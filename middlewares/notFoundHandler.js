const notFoundHandler = (req, res) => { 
    res.status(404).json({ message: "route not found" }) 
}

module.exports = notFoundHandler