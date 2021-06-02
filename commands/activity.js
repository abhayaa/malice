require('dotenv').config()
const mongoose = require('mongoose');
const profileModel = require('../models/activity');


module.exports = {
    name: "activity",
    alias: ["act"],
    permissions: [],
    description: "get member activity by messages",
    async execute(message, client, args, Discord, profileData){
        if(!args[0]){
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
        }else if(args[0] === "roles"){
            const response = await profileModel.find({},{
                "userID": 1,
                "messagesSent": 1
                }).limit(10).sort({
                    "roles":1
                });
        
                num = 1;
                let embed = new Discord.MessageEmbed()
                    .setAuthor("Malice Activity Monitor")
                    .setColor("#427318")
                    .setThumbnail(client.user.avatalURL)
                    .setTimestamp(Date.now());
                response.forEach(entry => {
                    embed.addField(num + '.', `User ` + `${message.guild.members.cache.get(entry.userID)}` +
                        ` with ` + `${message.guild.members.cache.get(entry.userID).roles.cache.size}` + ` roles.`);
                    num+=1;
                });
        
                message.channel.send(embed);
        }
    },
};
