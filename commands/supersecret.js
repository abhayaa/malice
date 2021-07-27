module.exports = {
    name: "super",
    description: "",
    usage:"",
    category:"Giveaways",
    aliases: [], // To add custom aliases just type ["alias1", "alias2"].
    async execute (message, client, args, Discord, profileData){

        let malice = client.guilds.cache.get(process.env.MALICE);
        let maliceIds = [];

        await malice.members.fetch()
        .then(members => {
            maliceIds = members.map(user => user.id);
        })
        .catch(err => {
            console.log("err while adding members to malice list on mlist", err);
        });

        if(!args[0]){

            let cult_members = 0
            let non_cult_members = 0

            await maliceIds.forEach(async member => {
                user = message.guild.members.cache.get(member);
                if (user.roles.cache.some(r => r.name === "Cult of Malice")){
                    cult_members = cult_members + 1;
                }else{
                    non_cult_members = non_cult_members +1;
                    await user.roles.add(process.env.MIRROR_ROLE);
                }
                    
                });

            message.channel.send("Number of cult members: " + cult_members);
            message.channel.send("Number of non cult members: " + non_cult_members);
        }

       // ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
        //const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m"];
        const letters = ["n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        if(args[0] === "time"){

            var currentTime = new Date();
            let numWeeks = 1;
            currentTime.setDate(currentTime.getDate() - 3);
            console.log(currentTime);

            let members_joined = 0;
            await maliceIds.forEach(member => {
                user = message.guild.members.cache.get(member);
                if(user.joinedAt > currentTime){
                    members_joined = members_joined + 1;
                }
            });
            message.channel.send("members joined in the last 3 days: " + members_joined);

        } else if(args[0] === "alpha"){

            let members_with = 0;

            await maliceIds.forEach(async member =>{
                user = message.guild.members.cache.get(member);
                //console.log(user);
                let username = await user.displayName.toLowerCase();
                //console.log(username);
                await letters.forEach(letter => {
                    if (username.startsWith(letter)){
                        if(!user.bot){
                            members_with = members_with + 1;
                        }
                    }
                });
            });

            message.channel.send("members with usernames between " + letters[0] + " and " + letters[letters.length-1] + " : " + members_with);
        }
    }   
}