require('dotenv').config()

module.exports = async (Discord, client, member) =>{
    let muse  = client.guilds.cache.get(process.env.MUSE);
    let malice = client.guilds.cache.get(process.env.MALICE);

    let museMembers = []

    await muse.members.fetch()
    .then(members => {
        museMembers = members.map(user => user.id);
    }).catch(err => {
        console.log("err while adding to muse list on leave event", err);
    });

    let memberid = member.id;

    if(member.guild.id === malice.id){
        console.log('member left malice: ' + memberid);
    }

    if(museMembers.includes(memberid)){
        user = await muse.members.cache.get(memberid);
        muse.channels.cache.get(process.env.MUSE_DEV_CHANNEL).send(`Member left/was kicked from Malice : ${user}`);
    }

}