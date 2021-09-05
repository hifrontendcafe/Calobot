import { Client } from 'discord.js';
import { CommandsExecute } from '../commands';
import { DiscordConfig } from '../config/discord.config';
const { PREFIX } = DiscordConfig.Bot;

export function messageCreate(client: Client): void {
	client.on('message', async message => {
		if (message.author.bot) return;
		if (!message.content.startsWith(<string>PREFIX)) return;
		const commandName = message.content.split(<string>PREFIX)[1];
		for (const command of CommandsExecute) {
			if (command.name === commandName) {
				await message.channel.send(command.execute());
			}
		}});
}
