module.exports = {
    name: "ginfo",
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
            title: "Giveaway Tempate",
            url: "",
            description: "Please provide the following information regarding your Giveaway :)",
            fields: [{
                name: "What we need from you :",
                value: `1. Item you are giving away\n
                        2. How many winners?\n
                        3. Cult Exclusive or Everyone?\n
                        4. Length of giveaway\n
                        `
              },
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