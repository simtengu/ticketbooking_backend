const roles = {
  admin: 111,
  regional_operator: 222,
  customer: 333,
};

const allowedOrigins = [
  "http://127.0.0.1:3000",
  "https://simtenguticketbooking.netlify.app",
  "http://localhost:3000",
];

const corsOptions = {
  origin: (orgn, callback) => {
    if (allowedOrigins.includes(orgn)) {
      callback(null, true);
    } else {
      callback(new Error("not allowed origin"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = { roles, allowedOrigins, corsOptions };
