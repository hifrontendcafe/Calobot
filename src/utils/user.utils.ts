import { DiscordConfig } from './../config/discord.config';
import { Message, User } from 'discord.js';
import { client } from '../client/client.instance';
import { RolesUtils } from './roles.utils';
import { GuildMember } from 'discord.js';

export class UserUtils {
	static getUserId(user: User): string {
		return `<@!${user.id}>`;
	}

	static getFirstUser(message: Message): User {
		return message.mentions.users.first();
	}

	static isMentor(message: Message): boolean {
		return RolesUtils.checkRole(message, message.author, 'Mentor');
	}

	static isUser(user: string): boolean {
		const reg = /<@!?(\d+)>/g;
		return reg.test(user);
	}

	static async getUser(userId: string): Promise<User> {
		const user = await client.users.fetch(userId);
		return user;
	}

	static async getMemberGuild(userId: string): Promise<GuildMember> {
		const user = await this.getUser(userId);
		return client.guilds.cache.get(DiscordConfig.Client.GUILD_ID).members.fetch(user);
	}

}
