import { Message } from 'discord.js';

export class MessageUtils {
	static getPrefix(message: Message, prefix: string) {
		return message.content.startsWith(prefix);
	}

	static withBacktick(message: string, length: number) {
		const start = message.padStart(message.length + length, '`');
		return start.padEnd(start.length + length, '`');
	}
}
