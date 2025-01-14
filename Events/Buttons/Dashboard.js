const { Client, ChannelType } = require("discord.js")
const DarkDashboard = require("dbd-dark-dashboard")
const DBD = require("discord-dashboard")
const WelcomeDB = require("../../Structures/Schemas/welcome.js")

module.exports = {
  name: "ready",

  /**
   * @param { Client } client
   */

   async execute(client) {

     let Information = []
     let Moderation = []

     const info = client.commands.filter(x => x.category === "Information")
     const mod = client.commands.filter(x => x.category === "Moderation")

     CommandPush(info, Information)
     CommandPush(mod, Moderation)



     await DBD.useLicense(process.env.DBD)
     DBD.Dashboard = DBD.UpdatedClass();

     const Dashboard = new DBD.Dashboard({
       port: 8000,
       client: {
         id: process.env.CLIENTID,
         secret: process.env.CLIENTSEC
       },
       redirectUri: "https://Nexon.crystalstudios.repl.co/discord/callback",
       domain: "https://Nexon.crystalstudios.repl.co",
       bot: client,
       supportServer: {
         slash: "/support",
         inviteUrl: "https://discord.gg", 
       },
       acceptPrivacyPolicy: true,
       minimalizedConsoleLogs: true,
       guildAfterAuthorization:{
         use: true,
         guildId: "983294338257788978",
       },
       invite: {
         ClientId: client.user.id,
         scopes: ["bot", "applications.commands", "guilds", "identify"],
         permissions: "8",
         redirectUrl: "https:discord.gg/"
       },
       theme: DarkDashboard({
         information: {
            createdBy: "iMidnight",
            websiteTitle: "iMidnight",
            websiteName: "iMidnight",
            websiteUrl: "https:/www.imidnight.ml/",
            dashboardUrl: "http://localhost:3000/",
            supporteMail: "support@imidnight.ml",
            supportServer: "https://discord.gg/yYq4UgRRzz",
            imageFavicon: "https://www.imidnight.ml/assets/img/logo-circular.png",
            iconURL: "https://www.imidnight.ml/assets/img/logo-circular.png",
            loggedIn: "Successfully signed in.",
            mainColor: "#2CA8FF",
            subColor: "#ebdbdb",
            preloader: "Loading..."
        },
    
        index: {
            card: {
                category: "iMidnight's Panel - The center of everything",
                title: `Welcome to the iMidnight discord where you can control the core features to the bot.`,
                image: "https://i.imgur.com/axnP93g.png",
                footer: "Footer",
            },
            
            information: {
                category: "Category",
                title: "Information",
                description: `This bot and panel is currently a work in progress so contact me if you find any issues on discord.`,
                footer: "Footer",
            },
            
            feeds: {
                category: "Category",
                title: "Information",
                description: `This bot and panel is currently a work in progress so contact me if you find any issues on discord.`,
                footer: "Footer",
            },
        },

        commands: [
            {
                category: "Information",
                subTitle: "Information Commands",
                alliasDisabled: false,
                list: Information
            },
          {
            category: "Moderation",
            subTitle: "Moderation Commands",
            alliasDisabled: false,
            list: Moderation 
          },
        ],
       }),
       settings: [

         // Welcome System
        {
          categoryId: "welcome",
          categoryName: "Welcome System",
          categoryDescription: "Set up the Welcome Channel",
          categoryOptionsList: [
            {
              optionId: "welch",
              optionName: "Welcome Channel",
              optionDescription: "Set or reset the server's welcome channel",
              optionType: DBD.formTypes.channelsSelect(false, channelTypes = [ChannelType.GuildText]),
              getActualSet: async ({ guild }) => {
                 let data =  await WelcomeDB.findOne({ Guild: guild.id }).catch(err => { })
                if (data) return data.Channel
                else return null
              },
              setName: async ({ guild, newData }) => {
                let data =  await WelcomeDB.findOne({ Guild: guild.id }).catch(err => { })
                if (!newData) newData = null
                if (!data) {
                  data = new WelcomeDB({
                    Guild: guild.id,
                    Channel: newData
                  })
                await data.save()
                } else {
                  data.Channel = new data
                  await data.save()
                }
                return 
              }
            }
          ]
        }
       ]
     });
     Dashboard.init()
   }
}

  function CommandPush(filteredArray, CategoryArray ) {

    filteredArray.forEach(obj => {
      let cmdObject = {
        commandName: obj.name,
        commandUsage: "/" + obj.name,
        commandDescription: obj.description,
        commandAlias: "none",
      }
      CategoryArray.push(cmdObject)
      
    })
    
  }