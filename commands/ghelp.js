module.exports = {
    name: "ghelp",
    description: "help command for all giveaway commands.",
    usage:"",
    category:"Giveaways",
    aliases: [], // To add custom aliases just type ["alias1", "alias2"].
    async execute (message, client, args, Discord, profileData){

      if((!message.member.roles.cache.has(process.env.MALICE_ROLE)) &&
        (!message.member.roles.cache.has(process.env.HEART_OF_MALICE)) &&
        (!message.member.roles.cache.has(process.env.HANDS_OF_MALICE)) &&
        (!message.member.roles.cache.has(process.env.SOUL_OF_MALICE)) &&
        (!message.member.roles.cache.has(process.env.MIND_OF_MALICE)) &&
        (!message.member.roles.cache.has(process.env.CREATION))){
            message.channel.send("You don't have permission to use this command.")
            return;
      }

        message.channel.send({ embed: {
            color: 3447003,
            author: {
              name: client.user.username,
              icon_url: client.user.displayAvatarURL()
            },
            title: "Giveaway Help",
            url: "",
            description: "Giveaway Commands, these will only work in the #dev-commands channel",
            fields: [{
                name: "m!gstart",
                value: "m!gstart [channel] [time] [# of winners] [prize]"
              },
              {
                name: "m!greroll",
                value: "m!greroll [messageID]"
              },
              {
                name: "m!gend",
                value: "m!gend [messageID]"
              }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.displayAvatarURL(),
              text: "© MALICE"
            }
          }
        });
    }
}