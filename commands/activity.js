require('dotenv').config()
const mongoose = require('mongoose');
const profileModel = require('../models/activity');


module.exports = {
    name: "activity",
    alias: ["act"],
    permissions: [],
    description: "get member activity by messages",
    async execute(message, client, args, Discord, profileData){
            const response = await profileModel.find({},{
            "userID": 1,
            "messagesSent": 1
        }).limit(10).sort({
            "messagesSent":1
        });

        num = 1;
        let embed = new Discord.MessageEmbed()
            .setAuthor("Malice Activity Monitor")
            .setColor("#427318")
            .setThumbnail(client.user.avatalURL)
            .setTimestamp(Date.now());
        response.forEach(entry => {
            embed.addField(num + '.', `User ` + `${message.guild.members.cache.get(entry.userID)}` +
                ` with ` + entry.messagesSent + ` messages.`);
            num+=1;
        });

        message.channel.send(embed);
        //msg.forEach(element => message.channel.send(element));
    },
};
