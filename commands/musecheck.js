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
        let kick_now = [];
       
        kickable = museIds.filter(e => !maliceIds.includes(e));

        let musecheckembed = new Discord.MessageEmbed()
            .setAuthor("Muse members not in Malice")
            .setColor("#427318")
            .setThumbnail(client.user.avatarURL)
            .setFooter('@WeAreMalice', 
                'https://cdn.discordapp.com/attachments/830895627457790038/830940981943074846/malice.png');

        let embedDesc = " ";
        await kickable.forEach(member => {
            kick = true;
            user = message.guild.members.cache.get(member);
            
            user.roles.cache.forEach( role =>{
                if (role.name == 'Muse' || role.name == 'Muse Independent Partner' || role.name == 'Muse Master' || role.name == 'Dyno'){
                    kick = false;
                }
            });

            if(kick && !user.bot){
                //message.channel.send(`${user}`);
                embedDesc = embedDesc + ' ' + `${user}`;
                kick_now.push(user);
            }
        });

        musecheckembed.setDescription(embedDesc);
        message.channel.send(musecheckembed);

        if(args[0] == "-k"){
            await kick_now.forEach(user => {
                user.kick();
            })
            muse.channels.cache.get(process.env.MUSE_DEV_CHANNEL).send(`Above members kicked.`);
        }
    }
}