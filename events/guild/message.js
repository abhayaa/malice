require('dotenv').config()
const profileModel = require('../../models/activitymodel')

module.exports = async (Discord, client, message) =>{
    const prefix = process.env.PREFIX;

    let profileData;
    
    try{
        profileData = await profileModel.findOne({userID: message.author.id});
    }catch(err){
        console.log(err);
    }

    if(profileData && !message.author.bot) {
            const response = await profileModel.findOneAndUpdate({
                userID: message.author.id,
            }, {
                $inc: {
                    messagesSent: 1,
                },
            });
        };

    if(message.author.bot){
        return;
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd);

    if(command) command.execute(message, client, args, Discord, profileData);
}