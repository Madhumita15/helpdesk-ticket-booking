const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require('dotenv').config()

const app = require('./src/app');
const dbCon = require("./src/config/dbCon.config");



const startServer = async()=>{
    const PORT = process.env.PORT || 3007;
     dbCon()
    app.listen(PORT, ()=>{
        console.log(`app is listening on http://localhost:${PORT}`)

    })

}

startServer()