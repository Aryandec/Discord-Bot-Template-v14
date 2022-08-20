const { GuildMember, Client, EmbedBuilder } = require("discord.js")
const DB = require("../../Structures/Schemas/welcome.js")

module.exports = {
  name: "guildMemberAdd",

  /**
  * @param {GuildMember} member
  * @param {Client} client
  */

async execute(member, client) {
  const {user, guild} = GuildMember
  const Data = await DB.findOne({ Guild: guild.id }).catch(err => { })
  if (!Data) return 
  const Message = `Hey ${user} welcome to **${guild.name}**`
  if (Data.Channel !== null) {
    const Channel = guild.channels.cache.get(Data.channel)
    if (!Channel) return 

    const Embed = new EmbedBuilder()
    .setColor(client.color)
    .setAuthot({name: user.tag, iconURL: user.displayAvatarURL()})
    .setDescription(`Welcome ${member} to the server!\n\nAccount created: <t:{parseInt(user.createdTimestamp / 1000)}:R>\nMember Count: \`${guild.memberCount}\` `)
    .setThumbnail(user.displayAvatarURL())
    .setFooter({ text: "Welcome by Nexon"})
    .setTimestamp()

    Channel.send({ content: `${Message}`, embeds: [Embed]})
        }
    }
}