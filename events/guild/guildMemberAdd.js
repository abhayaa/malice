const profileModel = require('../../models/activitymodel');

module.exports = async(Discord, client, member) => {
    // let profile = await profileModel.create({
    //     userID: member.id,
    //     messagesSent: 0,
    //     roles: 0
    // });

    let muse  = client.guilds.cache.get(process.env.MUSE);
    let memberid = member.id;
    let museMembers = []

    await muse.members.fetch()
    .then(members => {
        museMembers = members.map(user => user.id);
    }).catch(err => {
        console.log("err while adding on guildmemberadd", err);
    });    

    if(member.guild.id === muse.id){
        user = await muse.members.cache.get(memberid);
        await user.roles.add(process.env.MALICE_MUSE);
        muse.channels.cache.get(process.env.MUSE_DEV_CHANNEL).send(`New user joined, assigned Malice Muse role: ${user}`);
    }

    //profile.save();
}