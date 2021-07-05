module.exports = {
    name: "rmrole",
    description: "removes a role from a user",
    usage:"",
    category:"",
    aliases: [], // To add custom aliases just type ["alias1", "alias2"].
    async execute (message, client, args, Discord, profileData){

        if(message.channel.id != process.env.EXILED_CHANNEL){
            message.channel.send('This command can only be used in the Exiled Channel')
        }

        if(!args[0]){
            return message.channel.send("Missing arguments, check **m!rmrole help** for usage");
        }

        if(args[0] === 'help'){
            return message.channel.send("**m!rmrole [userid]** - will remove Cult of Malice Role");
        }

        let user = await message.guild.members.fetch(args[0])
        .then(console.log("removing cult role"))
        .catch(console.error);

        if (user.roles.cache.has(process.env.CULT_OF_MALICE)){
            user.roles.remove(process.env.CULT_OF_MALICE);
        }else {
            message.channel.send("User does not have Cult Role");
        }
    }
}

