const { Client, ChatInputInteractio } = require("discord.js")
const EditReply = require("../../Systems/EditReply.js")

module.exports = {
  name: "role",
  description: "Give or remove role from member or everyone",
  UserPerms: ["ManageRoles"],
  BotPerms: ["ManageRoles"],
  category: "Moderation",
  options: [
    {
      name: "options",
      description: "Select the option",
      type: 3,
      required: true,
      choices: [
        {
          name: "Give",
          value: "give"
        },
        {
          name: "Remove",
          value: "remove"
        },
        {
          name: "Give All",
          value: "give-all"
        },
        {
          name: "Remove-All",
          value: "remove-all"
        }
      ]
    },
          {
            name: "role",
            description: "Select the role to be managed",
            type: 8,
            required: true
          },
    {
      name: "user",
      description: "Selects the user to manage roles",
      type: 6,
      required: false
    }
  ],

  /**
    * @param  { Client } client
    * @param { ChatInputCommandInteraction } interaction 
    **/
async execute(client, interaction ) {
  await interaction.deferReply({ ephemeral: true })
  const { options, guild, user, member } = interaction
  const Options = options.getString("options")
  const Role = options.getRole("role")
  const Target = options.getMember("user") || member

  if (guild.members.me.roles.highest.position <= Role.position) return EditReply(interaction, "🚫",'The role you are trying to manage for a member is higher then me')

  switch (Options) {
    case "give": {
      if (guild.members.me.roles.highest.position <= Target.roles.highest.position) return EditReply(interaction, "🚫",'The member you are trying to manage is higher then me in roles')

      if(Target.roles.cache.find(r => r.id === Role.id)) return EditReply(interaction, "🚫", `${Target} already has the role **${Role.name}**` )

      await Target.roles.add(Role)
      return EditReply(interaction,  "✅", `${Target} has the role **${Role.name}**` )
    }
      break;
      case "remove": {
      if (guild.members.me.roles.highest.position <= Target.roles.highest.position) return EditReply(interaction, "🚫",'The member you are trying to manage is higher then me in roles')

      if(!Target.roles.cache.find(r => r.id === Role.id)) return EditReply(interaction, "🚫", `${Target} doesn't has the role **${Role.name}**` )

      await Target.roles.remove(Role)
      return EditReply(interaction,  "✅", `${Target} has lost the role **${Role.name}**` )
    }
      break;
      case "give-all": {
      const Members = guild.members.cache.filter(m => !m.user.bot)
      return EditReply(interaction, "✅", `Everyone now has the role **${Role.name}**`)
        await members.forEach(m => m.roles.add(Role))
      }
      break;
      case "remove-all": {
      const Members = guild.members.cache.filter(m => !m.user.bot)
      return EditReply(interaction, "✅", `Everyone has lost the role **${Role.name}**`)
        await members.forEach(m => m.roles.remove(Role))
      }
    } 
  }
}