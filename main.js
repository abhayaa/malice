const fs = require('fs')
const Discord = require('discord.js');
const profileModel = require('./models/activitySchema');
const mongoose = require('mongoose');
const { prefix, token, mongo } = require('./config.json');
const client = new Discord.Client();


client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log("Malice Activated");
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        client.commads.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
		message.reply('Command doesn\'t exist');
    }
});

client.on('guildMemberAdd', member =>{
    module.exports = async(client, discord, member) =>{
        let profile = await profileModel.create({
            userID: member.id,
            activity: 0
        });
        profile.save();
    }
});

client.on('message', message => {
    
})

mongoose.connect(mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => {
    console.log('Connected to the database');
}).catch((err) => {
    console.log(err)
})
 


client.login(token);

