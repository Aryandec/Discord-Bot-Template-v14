const { Client, EmbedBuilder, ActionRowBuilder, ChatInputCommandInteraction, ButtonBuilder, ButtonStyle  } = require("discord.js")
const DB = require('../../Structures/Schemas/verification.js')
// This is our new layout for executing the slash commands
module.exports = {
    name: "verification",
    description: "A complete system of guild verification",
    userPermissions: "MANAGE_GUILD",
    botPermissions: "MANAGE_GUILD",
    category: "Moderation",
    cooldown: '5s',
    options:  [
      {
          name: "role",
          description: "Select the verified member role ", 
          type: 8,
          required: true
      },
      {
        name: "channel",
        description: "Select the channel where the system will be sent",
        type: 7,
        required: false 
      }
    ], 

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */

    async execute(interaction, client) {
      
      await interaction.deferReply({ ephemeral: true})

      const { options, guild, channel } = interaction 

      const role = options.getRole("role")
      const Channel = options.getChannel("channel") || channel

      let Data = await DB.findOne({ Guild: guild.id}).catch(err => { } )

      if (!Data) {

        Data = new DB({
          Guild: guild.id,
          Role: role.id
        })

        await Data.save()

      } else {

        Data.role = role.id
        await Data.save()
        
      }

      Channel.send({
        embeds : [
          new EmbedBuilder()
                   .setColor(client.color)
                   .settitle(":nexonyes | Verification")
                   .setDescription("Click the button down below to verify")
                   .setTimestamp()
        ],
                   components: [
                   new ActionRowBuilder().addComponents(
                     new ButtonBuilder()
                     .setCustomId("verify")
                     .setLabel(":nexonyes")
                     .setStyle(ButtonStyle.Secondary)
                   )
            ]
      })
      return EditReply(interaction, ":nexonyes",`Successfully Sent verification panel in ${Channel}`)
    }


}