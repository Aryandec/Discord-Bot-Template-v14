const { Client, ChatInputInteraction } = require("discord.js")

module.exports = {
  name: "simulate",
  description: "simulate",
  UserPerms: ["Administrator"],
  BotPerms: ["Administrator"],
  category: "Owner",
  options: [
    {
      name: "option",
      description: "Choose a option",
      type: 3,
      required: true,
      choices: [
        {
          name: "Join",
          value: "join"
        },
       {
          name: "Leave",
          value: "leave"
        },
      ]
    }
  ]

  /**
  * @param {ChatInputInteraction} interaction   
  * @param {Client} client
  */

async execute(client, interaction) {
  const {  } = interaction
   }
}