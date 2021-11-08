import { client } from '../client/client.instance';
import { CommandExecute, CommandData, PrefixStore } from '../decorators/command.decorator';
import { CommandError } from '../utils/error.utils';

export function messageCreate(): void {
	client.on('messageCreate', async (message) => {
		if (message.author.bot)
			return;

		// iterate in all saved prefix	
		for (const prefix of PrefixStore) {
			if(!message.content.startsWith(<string>prefix))
				continue;
			
			const commandName = message.content.split(' ', 2).join(' ');
			let command: CommandData;

			if (CommandExecute.has(commandName)) {
				// get the command and subcommand
				command = CommandExecute.get(commandName);
			} else if(CommandExecute.has(commandName.split(' ')[0])) {
				// get the command
				command = CommandExecute.get(commandName.split(' ')[0]);
			} else {
				// Command not found!
				message.channel.send(`Command \`${commandName.split(' ')[0]}\` not found!`)
					.then(m => console.log(`${m.content}`))
					.catch(console.error);
				return;
			}
			
			try {
				// Ejecute the method
				await command.method(client, message);
			} catch (err) {
				const error = <CommandError>err;
				console.error(error.name, error.message);
				await message.channel.send(error.message).then((msg) => {
					setTimeout(() => msg.delete(), error.deleteAfter);
				});
			}
			return;
		}
	});
}
