import { User } from 'discord.js';

export class UserUtils {
	static getUserId(user: User): string {
		return `<@!${user.id}>`;
	}
}
