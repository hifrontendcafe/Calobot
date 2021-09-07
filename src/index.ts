import 'reflect-metadata';
import { DiscordConfig } from './config/discord.config';
import { Events } from './events';
import { client } from './client/client.instance';
// Create a new client instance

// When the client is ready, run this code (only once)
client?.user?.setStatus('online');

client.once('ready', () => {
	console.log('Ready!');
});

// Register of events with client
Events.forEach((evt) => evt);

// Login to Discord with your client's token
client.login(DiscordConfig.Bot.TOKEN);

