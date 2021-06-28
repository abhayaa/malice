require('dotenv').config()

module.exports = {
    name: "musecheck",
    alias: [],
    permissions: [],
    description: "crosscheck muse members with malice",
    async execute(message, client, args, Discord, profileData){
        let muse  = client.guilds.cache.get(process.env.MUSE);
        let malice = client.guilds.cache.get(process.env.MALICE);
        let maliceIds = [];
        let museIds = [];

        await malice.members.fetch()
        .then(members => {
            maliceIds = members.map(user => user.id);
        })
        .catch(err => {
            console.log("err while adding members to malice list", err);
        });

        await muse.members.fetch()
        .then(members => {
            museIds = members.map(user => user.id);
        }).catch(err => {
            console.log("err while adding to muse list", err);
        });

        let kickable = [];
       
        kickable = museIds.filter(e => !maliceIds.includes(e));

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