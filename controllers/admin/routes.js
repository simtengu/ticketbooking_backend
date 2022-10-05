const { NotFoundError, BadRequestError } = require("../../errors")
const Route = require("../../models/route")


const saveRoute = async(req,res)=>{
    const newRouteData = req.body
     const newRoute = await Route.findOne({from:newRouteData.from,to:newRouteData.to})
     if(newRoute) throw new BadRequestError("The route you are trying to add already exist")
    const route = await Route.create(newRouteData)

    res.status(201).json({route})
}
const getAllRoutes = async (req, res) => {
    const from = req.query.from ? { from: req.query.from} : {}
    const routes = await Route.find(from).sort({from:"asc"})
    res.status(200).json({ routes })

}

const updateRoute = async (req, res) => {
    const { routeId } = req.params
    const newRouteData = req.body;

    const newRoute = await Route.findOne({ from: newRouteData.from, to: newRouteData.to })

    if (newRoute && newRoute._id.toString() != routeId) throw new BadRequestError("The route you are trying to update to already exist")

    const route = await Route.findById(routeId)
    if (!route) throw new NotFoundError("The route specified wasn't found")
    const updatedRoute = await Route.findByIdAndUpdate(routeId, newRouteData, { new: true })

    res.status(200).json({ updatedRoute })

}


const deleteRoute = async (req, res) => {
    const { routeId } = req.params
    const route = await Route.findById(routeId)
    if (!route) throw new NotFoundError("The route specified wasn't found")
    await Route.findByIdAndRemove(routeId)
    res.sendStatus(200)

}

module.exports = { saveRoute, getAllRoutes, updateRoute, deleteRoute }

