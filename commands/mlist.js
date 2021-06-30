require('dotenv').config()

module.exports = {
    name: "mlist",
    alias: [],
    permissions: [],
    description: "get list of castaway and/or exiled",
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

        let malice = client.guilds.cache.get(process.env.MALICE);
        let maliceIds = [];

        await malice.members.fetch()
        .then(members => {
            maliceIds = members.map(user => user.id);
        })
        .catch(err => {
            console.log("err while adding members to malice list on mlist", err);
        });

        let exiled = []
        let castaway = []

        await maliceIds.forEach(member => {
            kick = true;
            user = message.guild.members.cache.get(member);
            
            user.roles.cache.forEach( role =>{
                if (role.name === 'Exiled'){
                    exiled.push(member);
                }else if(role.name === 'Castaway'){
                    castaway.push(member);
                }
            });
        });
        
        let exiledEmbed = new Discord.MessageEmbed()
            .setAuthor("Members with Exiled Role")
            .setColor("#427318")
            .setThumbnail(client.user.avatarURL)
            .setTimestamp(Date.now());

        let exiledDesc = " ";

        await exiled.forEach(entry =>{''
            user = malice.members.fetch(entry)
            .then(user=> {
                exiledDesc = exiledDesc +  ' ' + `${user}`;
            }).catch(console.error);
        });  

        exiledEmbed.setDescription(exiledDesc);
        
        let castawayEmbed = new Discord.MessageEmbed()
            .setAuthor("Members with Castaway Role")
            .setColor("#427318")
            .setThumbnail(client.user.avatarURL)
            .setTimestamp(Date.now());
            
        let castDesc = " ";

        await castaway.forEach(entry =>{
            user = malice.members.fetch(entry)
            .then(user=> {
                castDesc = castDesc +  ' ' + `${user}`;
            }).catch(console.error);
        });

        castawayEmbed.setDescription(castDesc);

        if(!args[0]){
            await message.channel.send(castawayEmbed);
            await message.channel.send(exiledEmbed);
        }else if(args[0] === '<@&834580153107611648>'){
            await message.channel.send(exiledEmbed);
        }else if(args[0] === '<@&851921975453548584>'){
            await message.channel.send(castawayEmbed);
        }else{
            message.channel.send('Role not currently supported.');
        }
    }
}