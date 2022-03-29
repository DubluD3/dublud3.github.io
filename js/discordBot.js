// Require the necessary discord.js classes

const Discord = require('../node_modules/discord.js');
const { Intents } = Discord;
const fs = require('fs');
//import { Client, Collection } from "../node_modules/discord.js";

// TOKEN
const token = 'OTU2NTY5Mjg5MzIwNzE4MzQ3.YjyIkg.yJE5vIG2zVEz0V_v2aYqGo_JZ1A';

// Create a new client instance
const client = new Discord.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
})

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});

const noStandard = "Sorry! It seems you don't have STANDARD in your wallet.";

client.on('messageCreate', (msg) => {
    let rawdata = fs.readFileSync('./js/wallet.json');
    let wallet = JSON.parse(rawdata);
    if (msg.content === '?hodler' && wallet.balance > 0) {
        msg.channel.send(wallet.balance);
    } else if (msg.content === '?hodler' && wallet.balance == 0) {
        msg.channel.send(noStandard);
    }
});

// Login to Discord with your client's token
client.login(token);