import { Client as Context,	Message } from 'discord.js';
import { Command, Ready } from '../decorators';
import * as chrono from 'chrono-node';

class ReminderCommand {
	@Ready()
	async ready(_ctx: Context) {
		console.log("Remminder ready!");
	}

	@Command()
	async reminder(_ctx: Context, msg: Message) {
		const strDatetime = msg.content.split(' ').slice(1).join(' ');
		console.log(strDatetime);
		let datetime = chrono.parseDate(strDatetime); 
		console.log(datetime);
	}

	@Command({ name: 'reminder list'})
	async list(_ctx: Context, msg: Message) {
		console.log("Command Remminder List!");
		msg.channel.send('I am reminder list')
			.then(m => console.log(`Sent message: ${m.content}`))
			.catch(console.error);
	}
}

export default new ReminderCommand();
