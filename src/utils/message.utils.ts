import { Message, Client, MessageEmbed } from 'discord.js';
import { client } from '../client/client.instance';

export class MessageUtils {
	_client: Client;

	constructor() {
		this._client = client;
	}
	static getPrefix(message: Message, prefix: string) {
		return message.content.startsWith(prefix);
	}

	static withBacktick(message: string, length: number) {
		const start = message.padStart(message.length + length, '`');
		return start.padEnd(start.length + length, '`');
	}

	async sendMessageToUser(content: string, userId: string) {
		try {
			const user = await this._client.users.fetch(userId);
			user.send(content);
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async sendMessageToChannel(content: MessageEmbed | string, channelId: string) {
		try {
			const channel = await this._client.channels.fetch(channelId);
			if (typeof content === 'string') {
				return channel.isText() && channel.send(content);
			}
			return channel.isText() && channel.send({ embeds: [content] });
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}
