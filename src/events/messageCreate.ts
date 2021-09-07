import { client } from '../client/client.instance';
import { CommandsExecute } from '../commands';
import { TCommand } from '../commands/Base.command';
import { DiscordConfig } from '../config/discord.config';
const { PREFIX } = DiscordConfig.Bot;

export function messageCreate(): void {
	client.on('messageCreate', async message => {
		if (message.author.bot) return;
		if (!message.content.startsWith(<string>PREFIX)) return;

		const commandName = message.content.split(<string>PREFIX)[1].split(' ')[0];
		const args = message.content.split(' ').splice(1);

		console.log(args);
		for (const command of CommandsExecute) {
			if (command && command.name === commandName) {
				try {
					command.options = <TCommand>{ message, args };
					const commandExecute = await command.execute();
					await message.channel.send(commandExecute);
				} catch (error) {
					console.error(error);
				}
			}
		}
	});
}
