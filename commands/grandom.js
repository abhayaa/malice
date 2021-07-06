module.exports = {
    name: "grandom",
    description: "Ends a giveaway if config file is cleared ",
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
        
        if (!args[0]) {
            return message.channel.send('No channel ID given.');
        }

        if(!args[1]){
            return message.channel.send('No message ID given.');
        }
        
        let malice = client.guilds.cache.get(process.env.MALICE);

        const channel = malice.channels.cache.get(args[0]);
        const msg = await channel.messages.fetch(args[1]).catch(console.err);

        const reactions = await msg.reactions.cache.find(emoji => emoji.emoji.name == 'maliceface');
        let usersReacted = [];
        msg.reactions.cache.map(async (reaction) => {
            if (reaction.emoji.name != 'maliceface') return;
            let reactedUsers = await reaction.users.fetch().catch(console.err);

            reactedUsers.map(async (user) => {
                usersReacted.push(`${user}`);
            });
            let randomuser = Math.floor(Math.random()*usersReacted.length);
            message.channel.send(`Randomly selected winner for Giveaway:\n${usersReacted[randomuser]}`);
        });
    }   
}