const profileModel = require('../../models/activitymodel');

module.exports = async(client, Discord, member) => {
    let profile = await profileModel.create({
        userID: member.id,
        messagesSent: 0,
        roles: 0
    });

    profile.save();
}