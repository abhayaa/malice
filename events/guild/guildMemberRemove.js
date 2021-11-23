require('dotenv').config()

module.exports = async (Discord, client, member) =>{
    let muse  = client.guilds.cache.get(process.env.MUSE);
    let malice = client.guilds.cache.get(process.env.MALICE);
    let monitor = client.guilds.cache.get(process.env.MONITOR);

    let museMembers = []
    let monitorMembers = []

    await muse.members.fetch()
    .then(members => {
        museMembers = members.map(user => user.id);
    }).catch(err => {
        console.log("err while adding to muse list on leave event", err);
    });

    await monitor.members.fetch()
    .then(members => {
        monitorMembers = members.map(user => user.id);
    }).catch(err => {
        console.log("err while adding to monitor list on leave event", err);
    });

    let memberid = member.id;

    if(member.guild.id === malice.id){
        console.log('member left malice: ' + memberid);
    }

    if(museMembers.includes(memberid)){
        user = await muse.members.cache.get(memberid);
        muse.channels.cache.get(process.env.MUSE_DEV_CHANNEL).send(`Member left/was kicked from Malice : ${user}`);
        await user.kick();
        muse.channels.cache.get(process.env.MUSE_DEV_CHANNEL).send(`And now kicked from Muse 8) : ${user}`);
        
    }

    if(monitorMembers.includes(memberid)){
        user = await muse.members.cache.get(memberid);
        muse.channels.cache.get(process.env.MONITOR_DEV_CHANNEL).send(`Member left/was kicked from Malice : ${user}`);
        await user.kick();
        muse.channels.cache.get(process.env.MONITOR_DEV_CHANNEL).send(`And now kicked from Monitor Server 8) : ${user}`);
        
    }

}