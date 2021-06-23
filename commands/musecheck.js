require('dotenv').config()


module.exports = {
    name: "musecheck",
    alias: [],
    permissions: [],
    description: "crosscheck muse members with malice",
    async execute(message, client, args, Discord, profileData){
        let muse  = client.guilds.cache.get(process.env.MUSE);
        let malice = client.guilds.cache.get(process.env.MALICE);
        


        let maliceMembers = malice.members.cache.array();
        let museMembers = muse.members.cache.array();

        let kickable = [];
        let maliceIds = [];
        let museIds = [];

        maliceMembers.forEach(member => {
            if(!member.bot){
                maliceIds.push(member.id);
            }
        })

        museMembers.forEach(member =>{
            if(!member.bot){
                museIds.push(member.id);
            }
        })

        // await message.channel.send("number of muse members w/o bots : " + museIds.length);
        // await message.channel.send("number of malice members w/o bots: " + maliceIds.length);
        // num = maliceIds.length - museIds.length;
        // await message.channel.send("# difference in members between Malice and Muse: " + num);
        

        kickable = museIds.filter(e => !maliceIds.includes(e));

        //await message.channel.send(kickable.length + " members to kick (probably)");


        await kickable.forEach(member => {
            kick = true;
            user = message.guild.members.cache.get(member);
            
            user.roles.cache.forEach( role =>{
                if (role.name == 'Muse' || role.name == 'Muse Independent Partner' || role.name == 'Muse Master' || role.name == 'Dyno'){
                    kick = false;
                }
            });

            if(kick && !user.bot){
                message.channel.send(`${user}`);
            }
        });

        message.channel.send('End.');
    }
}