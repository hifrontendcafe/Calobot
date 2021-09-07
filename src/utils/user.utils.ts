import { Message, User } from 'discord.js';
import { RolesUtils } from './roles.utils';

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

}
