require('dotenv').config()
const mongoose = require('mongoose');
const profileModel = require('../models/activitySchema');
const { execute } = require('./test');

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
        
        let msg = [];
        message.channel.send("Users with lowest amount of activity sorted by number of messages: \n");
        response.forEach(element =>{
            let user = message.guild.members.cache.get(element.userID);
            string = `\nUser ` + `${user}` + ` with ` + element.messagesSent + ` messages.`;
            msg.push(string);
        }); 

        msg.forEach(element => message.channel.send(element));
    },
};
