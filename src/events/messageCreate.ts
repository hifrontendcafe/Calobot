import { client } from '../client/client.instance';
import { CommandsExecute } from '../commands';
import { TCommand } from '../commands/Base.command';
import { CommandResponse, CommandUtils } from '../utils/command.utils';
import { CommandError } from '../utils/error.utils';

export function messageCreate(): void {
	client.on('messageCreate', async (message) => {
		if (message.author.bot) return;

		const utils = new CommandUtils(message);
		const args = utils.getArgs();
		for (const command of CommandsExecute) {
			if (!utils.startPrefix(command)) continue;

			const commandName = utils.getCommand(command);

			if (command && command.name === commandName) {
				try {
					command.options = <TCommand>{ message, args };
					const commandExecute: CommandResponse = await command.execute();

					await utils.sendMessage(commandExecute);
				} catch (e) {
					const error = <CommandError>e;
					console.error(error.name, error.message);
					await message.channel.send(error.message).then((msg) => {
						setTimeout(() => {
							msg.delete();
						}, error.deleteAfter);
					});
				}
			}
		}
	});
}
