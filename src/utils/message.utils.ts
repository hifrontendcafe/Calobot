import { Message } from 'discord.js';

export class MessageUtils {
	static getPrefix(message: Message, prefix: string) {
		return message.content.startsWith(prefix);
	}
}
