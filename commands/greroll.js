const ms = require('ms');
const config = require("../config.json");
const { execute } = require('./gstart');
module.exports = {
        name: "greroll",
        description: "Rerolls a giveaway.",
        usage: "",
        category: "Giveaways",
        accessableby: "Admins",
        aliases: [], // To add custom aliases just type ["alias1", "alias2"].
        async execute(message, client, args, Discord, profileData){
            
            if((!message.member.roles.cache.has(process.env.MALICE_ROLE)) &&
                (!message.member.roles.cache.has(process.env.HEART_OF_MALICE)) &&
                (!message.member.roles.cache.has(process.env.HANDS_OF_MALICE)) &&
                (!message.member.roles.cache.has(process.env.SOUL_OF_MALICE)) &&
                (!message.member.roles.cache.has(process.env.MIND_OF_MALICE)) &&
                (!message.member.roles.cache.has(process.env.CREATION))){
                    message.channel.send("You don't have permission to use this command.")
                    return;
            }

            if (!args[0]) {
                return message.channel.send('Invalid giveaway.');
            }

            let giveaway =
                client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
                client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

            if (!giveaway) {
                return message.channel.send('Invalid giveaway `' + args.join(' ') + '`.');
            }

            client.giveawaysManager.reroll(giveaway.messageID)
                .then(() => {
                    message.channel.send('Giveaway rerolled!');
                })
                .catch((e) => {
                    if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} has not ended.`)) {
                        message.channel.send('This giveaway has not ended!');
                    } else {
                        console.error(e);
                        message.channel.send('An error occurred...');
                    }
                });
        }
}
