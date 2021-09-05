// Require the necessary discord.js classes
import { Client, Intents } from 'discord.js';
import { DiscordConfig } from './config/discord.config';
import { Events } from './events';

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// When the client is ready, run this code (only once)
client?.user?.setStatus('online');

client.once('ready', () => {
	console.log('Ready!');
});

// Register of events with client
Events(client).forEach((evt) => evt);

// Login to Discord with your client's token
client.login(DiscordConfig.Bot.TOKEN);

