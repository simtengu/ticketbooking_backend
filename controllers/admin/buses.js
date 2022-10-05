const fs = require('fs')
const path = require('path')
const Bus = require("../../models/bus")

const multer = require("multer")
const { NotFoundError } = require('../../errors')



module.exports.registerBus = async (req, res) => {
    const new_bus = await Bus.create(req.body)
    res.status(201).json({ new_bus })

}

module.exports.getBuses = async (req, res) => {
    const buses = await Bus.find({}).sort({ busRoute: 'asc' })
    res.status(200).json({ buses })
}

module.exports.updateBus = async (req, res) => {
    const { busId } = req.params
    if (!busId) throw new NotFoundError("Invalid bus Id")

    const bus = await Bus.findByIdAndUpdate(busId, req.body, { new: true })
    res.status(200).json({ bus })

}

module.exports.deleteBus = async (req, res) => {
    const { busId } = req.params
    if (!busId) throw new NotFoundError("Invalid bus Id")
    const bus = await Bus.findById(busId)
    if (!bus) throw new NotFoundError("Invalid bus Id")
    if (bus.busPicture) {
        const busPicPathArray = bus.busPicture.split("/")
        const image_name = busPicPathArray[busPicPathArray.length - 1]
        //deleting bus image............... 
        const pic_path = path.join(__dirname, "/../../uploads/", image_name)

        fs.unlink(pic_path, (err => {
            if (err) { res.status(500).json({ message: err.message }); return; }
        }))

    }
    await Bus.findByIdAndDelete(busId)
    res.sendStatus(200)
}



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Math.round(Math.random() * 1000000) + file.originalname);
    }
})
const fileFilter = function (req, file, cb) {

    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
        cb(null, true)
    } else {
        cb(new Error("file type is invalid..(use .jpg, .png or .jpeg file) "))
    }



}
module.exports.uploadBusPicture = multer({ storage: storage, fileFilter: fileFilter, limits: { fileSize: 1024 * 1024 * 3 } });

module.exports.busPicUpload = async (req, res) => {
    const { busId } = req.query;
    const imagePath = req.file.filename;
    const imgUrl = `${process.env.BASE_URL}/uploads/${imagePath}`;
    if (busId) {
        //we are in updating mode...update bus image field too.
        await Bus.findByIdAndUpdate(busId, { busPicture: imgUrl })
    }
    res.status(200).json({ imgUrl })
}

module.exports.deleteBusImage = async (req, res) => {
    const { busId } = req.query;

    const { image_name } = req.params
    const pic_path = path.join(__dirname, "/../../uploads/", image_name)

    fs.unlink(pic_path, (err => {
        if (err) { res.status(500).json({ message: err.message }); return; }
    }))
    if (busId) {
        //we are in updating mode...update bus image field too.
        await Bus.findByIdAndUpdate(busId, { busPicture: "" })
    }
    res.sendStatus(200)

}