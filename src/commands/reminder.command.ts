import { Client as Context, Message } from 'discord.js';
import { Command, Ready } from '../decorators';
import * as chrono from 'chrono-node';

class ReminderCommand {
	@Ready()
	async ready(_ctx: Context) {
		console.log('Remminder ready!');
	}

	@Command()
	async reminder(_ctx: Context, msg: Message) {
		const strDatetime = msg.content.split(' ').slice(1).join(' ');
		console.log(strDatetime);
		const datetime = chrono.parseDate(strDatetime);
		console.log(datetime);
	}

	@Command({ name: 'reminder list' })
	async list(_ctx: Context, msg: Message) {
		console.log(msg.author);
		try {
			_ctx.users.fetch(msg.author.id).then((user) => {
				user.send('Hola').catch((err) => {
					console.log(err);
				});
			});
		} catch (error) {
			console.error(error);
		}
	}
}

export default new ReminderCommand();
