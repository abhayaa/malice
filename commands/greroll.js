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
            if (!message.member.roles.cache.some((r) => r.name === "Hands of Malice")) {
                return message.channel.send('Insufficient permissions to reroll.');
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
