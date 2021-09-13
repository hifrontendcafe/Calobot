import { Client as Context,	Message } from 'discord.js';
import { Command, Ready } from '../decorators';

class ExampleCommand {
	@Ready()
	async ready(ctx: Context) {}

	@Command()
	example(ctx: Context, msg: Message) {}
}

export default new ExampleCommand();

