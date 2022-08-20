const { Client, Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const ms = require("ms")

module.exports = {
  name: "messageCreate",

  /**
   * @param {Message} message
   * @param {Client} client
  */
  async execute(message, client) {
    const { author, guild, content } = message
    const { user } = client

    if (!guild || author.bot) return
    if (content.includes("@here") || content.includes("@everyone")) return
    if (!content.includes(user.id)) return

    return message.reply({

      embeds: [
        new EmbedBuilder()
        .setColor(client.setColor)
        .setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
        .setDescription(`Hey ${user.tag}, I am fully build in `/` commands /n/n Make sure to use `/[commands]` set up the server according to the functionality of the bot`)
        .setFooter(`This message will be deleted in 10s`)
        .setTimestamp()
      ],

      components: [
        new ActionRowBuilder().addComponents(
          new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setURL("https://nexon.ml/invite")
          .setLabel("Invite me"),
        ) 
       ]
     }).then(msg => {
      setTimeout(() => {
        msg.delete().catch(err => {
          if (err.code !== 10008) return console.log(err)
        })
      }, ms("10s"))
     })
    }
  }                       
