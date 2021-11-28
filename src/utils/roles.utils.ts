import { GuildMember, GuildMemberEditData, Message, User } from 'discord.js';

export class RolesUtils {
	private message: Message;
	private role: string;
	constructor(message: Message, role: string) {
		this.message = message;
		this.role = role;
	}

	getRole() {
		return this.message.guild.roles.cache.find(r => r.name === this.role);
	}

	// TODO: move this to a member utils class
	getMember(user: User) {
		return this.message.guild.members.cache.find(m => m.id === user.id);
	}

	async setRole(user: User) {
		// get role id
		const roleId = this.getRole();
		this.getMember(user).roles.add(roleId);
	}

	async removeRole(user: User) {
		// get role id
		const role = this.getRole();
		this.getMember(user).roles.remove(role);
	}

	checkRole(user: User) {
		const role = this.getRole();
		return this.getMember(user).roles.cache.has(role.id);
	}

	static checkRole(message: Message, user: User, role: string) {
		const rolesUtils = new RolesUtils(message, role);
		return rolesUtils.checkRole(user);
	}

	static findRoleByName(message: Message, role: string) {
		const rolesUtils = new RolesUtils(message, role);
		return rolesUtils.getRole();
	}

	static async setRole(user: GuildMember, role) {
		try {
			await user.roles.add(role);
		} catch (error) {
			console.log(error);
			throw new Error("cannot assign role to user");
		}
	}

	static async removeRole(user: GuildMember, role) {
		try {
			await user.roles.remove(role);
		} catch (error) {
			console.log(error);
			throw new Error("cannot remove role from user");
		}
	}
}
