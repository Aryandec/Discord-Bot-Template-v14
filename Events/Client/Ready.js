const { Client } = require("discord.js")
const ms = require("ms")
const mongoose = require("mongoose")
const MONGO = process.env.MONGO 

module.exports = {
    name: "ready",

    /**
    * @param {Client} client
    */
    async execute(client) {

        const { user, ws } = client

        console.log(`${user.tag} is now online!`)

        setInterval(() => {

            const ping = ws.ping

            user.setActivity({
                name: `Ping: ${ping} ms`,
                type: 3,
            })

        }, ms("5s"))

      if (!MONGO) return
      mongoose.connect(MONGO, {
        useUnifiedTopology: true,
        useNewUrlParser: true,    
      })
        .then(() => {
        console.log("Connected to Database")
      }).catch(err => console.log(err))
    }
}