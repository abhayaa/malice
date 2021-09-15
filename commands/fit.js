module.exports = {
    name: "fit",
    description: "fitness goal tracker",
    usage:"",
    category:"Fitness",
    aliases: [], // To add custom aliases just type ["alias1", "alias2"].
    async execute (message, client, args, Discord, profileData){
        if(message.channel.id === process.env.FITNESS_SUBMISSION){
            if(args[0] === 'help'){
                message.channel.send("m!fit [current][goal]");
            }

            let attachmentLink = 'https://cdn.discordapp.com/attachments/830262739372736522/857423437471285288/maliceominousmask2.png'
            if(message.attachments.size > 0){
                console.log('Image found');
                var Attachment = (message.attachments)
                attachmentLink = Attachment.array()[0].url
            }
            if(!args[0] || !args[1]){
                message.channel.send("Invalid format, type m!fit help for usage info");
            } else {
                
            let fitEmbed = new Discord.MessageEmbed()
            .setAuthor("Fitness tracking for " + message.author.username, message.author.avatarURL)
            .setColor("#427318")
            .setThumbnail(client.user.avatarURL)
            .setTimestamp(Date.now())
            .setImage(attachmentLink)
            .addFields(
                { name: 'Goal:', value: args[1] },
                { name: 'Starting Measurement:', value: args[0] },
            )
            
            const channel = client.channels.cache.find(channel => channel.id === process.env.FITNESS_ADMIN)
            await message.delete({timeout: 1000});
            channel.send(fitEmbed);
            }
        }

    }
}