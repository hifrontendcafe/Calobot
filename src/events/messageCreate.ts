import { client } from '../client/client.instance';
import { CommandsExecute } from '../commands';
import { TCommand } from '../commands/Base.command';

export function messageCreate(): void {
	client.on('messageCreate', async (message) => {
		if (message.author.bot) return;

		const args = message.content.split(' ').splice(1);

		for (const command of CommandsExecute) {
			if (!message.content.startsWith(<string>command.prefix)) continue;
			const commandName = message.content.split(<string>command.prefix)[1].split(' ')[0];
			if (command && command.name === commandName) {
				try {
					command.options = <TCommand>{ message, args };
					const commandExecute = await command.execute();

					await message.channel.send(commandExecute.message).then((msg) => {
						if (commandExecute.delete) {
							setTimeout(() => {
								msg.delete();
							}, 1000);
						}
					});
				} catch (error) {
					console.error('Invalid command', error.message);
					await message.channel.send(error.message).then((msg) => {
						setTimeout(() => {
							msg.delete();
						}, 3000);
					});
				}
			}
		}
	});
}
