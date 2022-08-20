const { CommandInteraction, EmbedBuilder,  ButtonBuilder, ButtonStyle } = require("discord.js")

module.exports = {
  name: "serverinfo",
  description: "Gives the information about the server",
  category: "Information",
    
  /**
    * @param { CommandInteraction } interaction 
   */
    
    async  execute(interaction, client) {  
  
  const { guild } = interaction 
  await interaction.deferReply().catch(e => null);
  await interaction.guild.members.fetch({force: false}); // fetching remaining members
  
  const { createdTimestamp, ownerId, members, memberCount } = guild

  const Embed = new EmbedBuilder()
  .setColor("Aqua")
  .setAuthor({name: `${guild.name}`, iconURL: guild.iconURL({dynamic: true})})
  .setThumbnail(guild.iconURL({dynamic: true}))
  .addFields([
    {
      name: "GENERAL",
      value:
        `
        :replycount: Name:${guild.name}
        :replycount: Created: <t:${parseInt(createdTimestamp / 1000)}:R>
        :replycount: Owner: <@${ownerId}>
        :reply: Description: ${guild.description}
        `
    },
    {
      name: "USERS",
      vaule: 
      `
      :replycount: Members: ${members.cache.filter((m) => !m.user.bot).size}
      :replycount: Bots: ${members.cache.filter((m) => m.user.bot).size}
      :reply: Total: ${memberCount}
      `
    }
  ])
  interaction.reply({embeds: [Embed]})
  }
}