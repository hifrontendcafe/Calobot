import { Message } from 'discord.js';
import { BaseCommand } from '../commands/Base.command';

export class CommandUtils {
	private message: Message;
	constructor(message: Message) {
		this.message = message;
	}

	public startPrefix(command: BaseCommand): boolean {
		return this.message.content.startsWith(<string>command.prefix);
	}

	public getCommand(command: BaseCommand): string {
		return this.message.content.split(<string>command.prefix)[1].split(' ')[0];
	}

	public getArgs(): string[] {
		return this.message.content.split(' ').splice(1);
	}

	async sendMessage(command: CommandResponse): Promise<void> {
		this.message.channel.send(command.message).then((msg) => {
			if (command.delete) {
				setTimeout(() => {
					msg.delete();
				}, command.deleteAfter);
			}
		});
	}
}

interface TCommandResponse {
	message: string;
	delete?: boolean;
	deleteAfter?: number;
}

export class CommandResponse {
	message: string;
	delete?: boolean;
	deleteAfter?: number;
	constructor(options: TCommandResponse) {
		this.message = options.message;
		this.delete = options.delete || false;
		const deleteTime = (options.deleteAfter || 5) * 1000;
		this.deleteAfter = deleteTime;
	}
}
