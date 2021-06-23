require('dotenv').config()
const mongoose = require('mongoose');
const profileModel = require('../models/activitymodel');


module.exports = {
    name: "activity",
    alias: ["act"],
    permissions: [],
    description: "get member activity by messages",
    async execute(message, client, args, Discord, profileData){

        async function getUser(usr){
            return await message.guild.members.fetch(usr);
        }

        console.log("executing");
        if(!args[0]){
            console.log("running activity");
            const response =  await profileModel.find({},{
                "userID": 1,
                "messagesSent": 1
                }).limit(10).sort({
                    "messagesSent":1
                });

                num = 1;
                let embed = new Discord.MessageEmbed()
                    .setAuthor("Malice Activity Monitor")
                    .setColor("#427318")
                    .setThumbnail(client.user.avatarURL)
                    .setTimestamp(Date.now());

                response.forEach(entry => {
                    user = getUser(entry.userID);
                    embed.addField(num + '.', `User ` + `${user}` +
                        ` with ` + entry.messagesSent + ` messages.`);
                    num+=1;
                });
                message.channel.send(embed);

        }else if(args[0] === "roles"){
            console.log("running activity by roles");
            const response = await profileModel.find({},{
                "userID": 1,
                "roles": 1
                }).limit(10).sort({
                    "roles": 1
                });

                num = 1;
                let embed = new Discord.MessageEmbed()
                    .setAuthor("Malice Activity Monitor")
                    .setColor("#427318")
                    .setThumbnail(client.user.avatarURL)
                    .setTimestamp(Date.now());

                response.forEach(entry => {
                    embed.addField(num + '.', `User ` + `${message.guild.members.fetch(entry.userID)}` +
                        ` with ` + entry.roles + ` roles.`);
                    num+=1;
                });
                message.channel.send(embed);
        }
    },
};
