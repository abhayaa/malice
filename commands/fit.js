module.exports = {
    name: "fit",
    description: "fitness goal tracker",
    usage:"",
    category:"Fitness",
    aliases: [], // To add custom aliases just type ["alias1", "alias2"].
    async execute (message, client, args, Discord, profileData){
        if(message.channel.id === process.env.DEV_CHANNEL){
            if(args[0] === 'help'){
                message.channel.send("m!fit [current][goal]");
            }
            if(!args[0] || !args[1]){
                message.channel.send("Invalid format, type m!fit help for usage info");
            } else {
                
            let fitEmbed = new Discord.MessageEmbed()
            .setAuthor("Fitness tracking for " + message.author.username)
            .setColor("#427318")
            .setThumbnail(client.user.avatarURL)
            .setTimestamp(Date.now())
            .addFields(
                { name: 'Goal:', value: args[1] },
                { name: 'Starting Measurement:', value: args[0] },
            )

            message.channel.send(fitEmbed);
            
        }
        }

    }
}