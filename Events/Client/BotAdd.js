const { Client, Guild, Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require("discord.js")
const ms = require("ms")

module.exports = {
  name: "guildCreate",

  /**
   * @param {Guild} guild
   * @param {Client} client
  */
  async execute(guild, client) {
    const { name, members, channels } = guild
    let channelToSend
    channel.cache.forEach(channel => {
      if (channel.type === ChannelType.GuildText && !channelToSend && channel.permissions.For(members.me).has("SendMessage")) channelToSend = channel
    })
   if (!channelToSend) return
    const Embed = new EmbedBuilder()
    .setColor(client.color)
    .setAuthor({ name: name, iconURL: guild.iconURL() })
    .setDescription("Hey this is **Nexon** | Thanks for inviting me to your server")
    .setFooter({text: "Developed me Aryan"})
    .setTimestamp()

    const Row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setURL("https://nexon.ml")
      .setLabel("Invite me")      
    )
  ChannelToSend.send({ embed: [Embed], components: [Row]}) 
  }
}