const fs = require('fs')
const config = require('./config.json')
require('dotenv').config()
const Discord  = require('discord.js');
const mongoose = require('mongoose');
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});

module.exports = {client};

const { GiveawaysManager} = require('discord-giveaways');

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});

module.exports = {client};

['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
})

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => {
    console.log('Connected to the database');
}).catch((err) => {
    console.log(err)
})
 
client.login(process.env.TOKEN);

