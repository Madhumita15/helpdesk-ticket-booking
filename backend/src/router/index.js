const express = require('express')
const router = express.Router()
const authRouter = require('./auth.router')
const userRouter = require('./user.router')
const ticketRouter = require('./ticket.router')

router.use("/api/v1/auth", authRouter)
router.use("/api/v1", userRouter)
router.use("/api/v1", ticketRouter)






module.exports = router