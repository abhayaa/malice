const ms = require('ms');
const config = require("../config.json")


module.exports = {
        name: "gstart",
        description: "Starts a giveaway.",
        usage: "",
        category: "Giveaways",
        accessableby: "Admins",
        aliases: [], // To add custom aliases just type ["alias1", "alias2"].
        async execute(message, client, args, Discord, profileData){
            if (args[0] === '-help'){
                return message.channel.send('Usage m!gstart [channel] [time] [# of winners] [Prize]');
            }
            if (message.channel.id != process.env.DEV_CHANNEL) {
                return message.channel.send('Cannot start giveaway here :)');
            }
            let giveawayChannel = message.mentions.channels.first();
            if (!giveawayChannel) {
                return message.channel.send('Invalid channel.');
            }
    
            let giveawayDuration = args[1];
            if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
                return message.channel.send('No duration provided.');
            }
    
            let giveawayNumberWinners = args[2];
            if (isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)) {
                return message.channel.send('Number of winners missing.');
            }
    
            let giveawayPrize = args.slice(3).join(' ');
            if (!giveawayPrize) {
                return message.channel.send('Prize invalid');
            }
            if (config["Giveaway_Options"].showMention) {
    
                client.giveawaysManager.start(giveawayChannel, {
                    time: ms(giveawayDuration),
                    prize: giveawayPrize,
                    winnerCount: parseInt(giveawayNumberWinners),
                    exemptMembers: (member) => member.roles.cache.some((r) => r.name === 'Castaway'),
                    hostedBy: config["Giveaway_Options"].hostedBy ? message.author : null,
                    messages: {
                        giveaway: "<a:maliceworship:832655353523077120> **GIVEAWAY** <a:maliceworshipR:833430111545458739>",
                        giveawayEnded: "<a:malicemoon:838218751416467466> **GIVEAWAY ENDED** <a:malicemoon:838218751416467466>",
                        timeRemaining: "Time remaining: **{duration}**!",
                        inviteToParticipate: "React with <:maliceface:814236915310133278> to participate!",
                        winMessage: "Congratulations, {winners}! You won the **{prize}**!",
                        embedFooter: "Malice Giveaways",
                        noWinner: "Not enough entrants to determine a winner!",
                        hostedBy: "Hosted by: {user}",
                        winners: "winner(s)",
                        endedAt: "Ended at",
                        units: {
                            seconds: "seconds",
                            minutes: "minutes",
                            hours: "hours",
                            days: "days",
                            pluralS: false
                        }
                    }
                });
            }
            message.channel.send(`The giveaway for the \`${giveawayPrize}\` is starting in ${giveawayChannel}.`);


        }
}
