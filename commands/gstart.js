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
            if (!message.member.roles.cache.some((r) => r.name === "Hands of Malice")) {
                return message.channel.send(':boom: You need to have the \`MANAGE_MESSAGES\` permissions to start giveaways.');
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
                    hostedBy: config["Giveaway_Options"].hostedBy ? message.author : null,
                    messages: {
                        giveaway: ":maliceheart: **GIVEAWAY** :maliceheart:",
                        giveawayEnded: ":tada: **GIVEAWAY ENDED** :tada:",
                        timeRemaining: "Time remaining: **{duration}**!",
                        inviteToParticipate: "React with 🎉 to participate!",
                        winMessage: "Congratulations, {winners}! You won the **{prize}**!",
                        embedFooter: "Giveaways",
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
