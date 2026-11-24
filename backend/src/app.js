const express = require('express')
const errorHandelere = require('./middleware/errorHandeler.moddleware')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')


const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3007"
].filter(Boolean);
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(cookieParser());

app.use(express.json())
app.use(express.urlencoded({extended: true}))


const router = require('../src/router/index')


app.use(router)


app.use(errorHandelere)


module.exports = app