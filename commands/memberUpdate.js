const profileModel = require('../models/activity')
require('dotenv').config()

module.exports = {
    name: "memberupdate",
    alias: [],
    permissions: [],
    description: "get member activity by messages",
    async execute(message, client, args, Discord, profileData){
        num = 0;
        message.guild.members.cache.each(member=>{
            if(!profileData && !message.author.bot){
                let profile = profileModel.create({
                    userID: member.id,
                    username: member.username,
                    nessagesSent:1,
                    roles: member.roles.cache.size
                    
                })
            }else if(profileData && !message.author.bot){
                const respose = profileModel.findOneAndUpdate({
                    userID: member.id,
                },{
                    roles: member.roles.cache.size
                })
            }

            num+=1;
        });
        
        message.channel.send("All members updated with number of roles they have: ".concat(num));
        
    },
};