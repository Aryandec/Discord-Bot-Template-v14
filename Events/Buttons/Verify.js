const { Client, MessageComponentInteraction, EmbedBuilde, InteractionType } = require("discord.js")
const DB = require("../../Structures/Schemas/verification.js")
const EditReply = require("../../Systems/EditReply.js")

module.exports = {
  name: "interactionCreate",

  /**
   * @paramm { MessageComponentInteraction } interaction 
   * @param { Client } client
  */ 

  async execute(interaction, client) {
    
    const { guild, customId, member, type } = interaction 

    if (type !== InteractionType.MessageComponent) return
    
    const CustomId = ["verify"]
    if (!CustomId.includes(customId)) return

    await interaction.deferReply({ ephemeral: true})

    const Data = await model.findOne ({ Guild: guild.id }).catch(err =>{ })
    if (!Data) return EditReply(interaction, ":nexonno:", "Could not find any data" )

    const Role = guild.role.cache.get(Data.role)

    if (member.roles.cache.has( Role.id)) return EditReply(interaction, ":nexonno:", "You are already verified as a member" )

    await member.role.add(Role)

    EditReply(interaction,  ":nexonyes:", "You are now verified as a member"  )
  } 
}
