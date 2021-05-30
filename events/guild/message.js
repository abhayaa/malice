require('dotenv').config()
const profileModel = require('../../models/activitySchema')

module.exports = async (Discord, client, message) =>{
    const prefix = process.env.PREFIX;

    let profileData;
    
    try{
        profileData = await profileModel.findOne({userID: message.author.id});
    }catch(err){
        console.log(err);
    }

    if(!message.content.startsWith(prefix) || message.author.bot){
        if(!profileData){
            let profile = await profileModel.create({
                userID: message.author.id,
                messagesSent: 0,
                roles: 0
            });
            profile.save();
        } else {
            const response = await profileModel.findOneAndUpdate({
                userID: message.author.id,
            }, {
                $inc: {
                    messagesSent: 1,
                },
            });
        }
    };

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd);
    
    if(command) command.execute(message, client, args, Discord, profileData);
}