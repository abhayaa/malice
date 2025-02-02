const profileModel = require('../models/activitymodel')
require('dotenv').config()

module.exports = {
    name: "memberupdate",
    alias: [],
    permissions: [],
    description: "Get member activity by messages",
    async execute(message, client, args, Discord, profileData){
        if((!message.member.roles.cache.has(process.env.MALICE_ROLE)) &&
            (!message.member.roles.cache.has(process.env.HEART_OF_MALICE)) &&
            (!message.member.roles.cache.has(process.env.HANDS_OF_MALICE)) &&
            (!message.member.roles.cache.has(process.env.SOUL_OF_MALICE)) &&
            (!message.member.roles.cache.has(process.env.MIND_OF_MALICE)) &&
            (!message.member.roles.cache.has(process.env.CREATION))){
                message.channel.send("You don't have permission to use this command.")
                return;
        }
        
        num = 0;
        message.guild.members.fetch()
        .then(member =>{
            if(!member.user.bot){
                console.log("adding new");
                let profile = profileModel.create({
                    userID: member.user.id,
                    username: member.user.username,
                    nessagesSent:1,
                    roles: member.user.roles.cache.size
                })
            }else if(data && !member.user.bot){
                console.log("adding new");
                const profile = profileModel.findOneAndUpdate({
                    userID: member.user.id,
                },{
                    roles: member.user.roles.cache.size
                })
            }
            num+=1;
        });
        message.channel.send("Members role updated ".concat(num));
    },
};