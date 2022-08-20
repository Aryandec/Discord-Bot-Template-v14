const { Client, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js")

module.exports = {
  name: "embed",
  description: "embed",

  async execute(client, interaction) {
    const embed = new EmbedBuilder()
    .setDescription(Suiii)
  }
} 
