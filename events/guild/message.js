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

    if(message.channel.id === process.env.MALICE_SUCCESS){
        console.log("saw message");
        console.log(message.attachments.size);
        if(message.attachments.size === 0){
            //message.channel.send("image detected");
            // message.channel.send("no image attached, deleting");
            await message.delete({timeout: 1000});
        }
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd);

    if(command) command.execute(message, client, args, Discord, profileData);
}