const express = require("express");
const app = express();
// const pdf = require("html-pdf");
// const pdfTemplate = require("./documents/ticketTemplate");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("express-async-errors");

const User = require("./models/user");

//middlewares..................................................
const { errorHandler, notFoundHandler } = require("./middlewares");
const { authVerification, rolesCheck, credentials } = require("./middlewares");
//configs
const {
  roles: { admin, customer },
  corsOptions,
} = require("./config");
const {
  authRouter,
  adminRouter,
  customersRouter,
  userRouter,
} = require("./routes");

const connectDb = require("./db");
const { BadRequestError } = require("./errors");
//use middlewares....

app.use("/uploads", express.static("uploads"));
//allowed origins/cookies .......... ....
app.use(credentials);
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
//routes.............. ....
app.get("/", function (req, res) {
  res.json({ message: "welcome to online bus ticket booking api" });
});
//auth..
app.use("/api", authRouter);
//customers..
app.use("/api", customersRouter);
//admin..
app.use(
  "/api/admin",
  authVerification,
  rolesCheck(admin, customer),
  adminRouter
);
//users..
app.use("/api", authVerification, userRouter);

//download ticket ...................
const ticketPdfGeneration = async (req, res) => {
  throw new BadRequestError("something went wrong");
  //   let tiketi = req.body;
  //   let dt = new Date(tiketi.departingDate);
  //   dt = dt.toDateString();
  //   tiketi.departingDate = dt;

  //   pdf.create(pdfTemplate(tiketi), {}).toFile(`${tiketi._id}.pdf`, (err) => {
  //     if (err) {
  //       console.log(err);
  //       return Promise.reject("couldn't create a pdf file..");
  //     }
  //     return Promise.resolve();
  //   });

  res.sendStatus(201);
};

const downloadTicket = async (req, res) => {
  throw new BadRequestError("something went wrong");

  //   const { ticketName } = req.query;
  //   if (!ticketName) throw BadRequestError("no pdf name passed");
  res.sendStatus(200);

  //   res.sendFile(`${__dirname}/${ticketName}.pdf`);
};

app.post("/api/postTicket", ticketPdfGeneration);
app.get("/api/getpdf", downloadTicket);

//error handler.............
app.use(errorHandler);
app.use(notFoundHandler);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    // console.log('connected to mongo db');
    app.listen(port, () => {
      console.log(`app is listening on port ${port}`);
    });
  } catch (error) {
    console.log("Server cannot start.....something went wrong ");
  }
};

start();
