const Region = require("../../models/region")
const { NotFoundError } = require("../../errors")

const registerRegion = async (req, res) => {
    const new_region = new Region();
    new_region.name = req.body.name;

    await new_region.save();
    res.status(201).json({ message: "region saved successfuly" })
}


const updateRegion = async (req, res) => {
    const region = await Region.findOne({ name: req.params.id });
    if (!region) throw new NotFoundError("The region specified wasn't found")
    region.name = req.body.name;
    await region.save()
    res.sendStatus(200)
}

const deleteRegion = async (req, res) => {
    const region = await Region.findOneAndDelete({ name: req.params.id });
    res.sendStatus(200);
}

module.exports = { registerRegion, updateRegion, deleteRegion }