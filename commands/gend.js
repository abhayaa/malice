module.exports = {
        name: "gend",
        description: "Ends a giveaway.",
        usage:"",
        category:"Giveaways",
        aliases: [], // To add custom aliases just type ["alias1", "alias2"].
        async execute (message, client, args, Discord, profileData){
            
            if (!args[0]) {
                return message.channel.send('Invalid giveaway to end.');
            }

            let giveaway =
                client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
                client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

            if (!giveaway) {
                return message.channel.send('Cannot find giveaway for`' + args.join(' ') + '`.');
            }
            client.giveawaysManager.edit(giveaway.messageID, {
                setEndTimestamp: Date.now()
            })
                .then(() => {
                    message.channel.send('Giveaway will end in less than ' + (client.giveawaysManager.options.updateCountdownEvery / 1000) + ' seconds');
                })
                .catch((e) => {
                    if (e.startsWith(`Giveaway with message ID ${giveaway.messageID} has already ended.`)) {

                        message.channel.send('This giveaway has already ended!');

                    } else {
                        console.error(e);
                        message.channel.send('Error occurred.');
                    }
                });
    }   
}