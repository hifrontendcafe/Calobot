/* eslint-disable @typescript-eslint/ban-types */
import { DiscordConfig } from '../config/discord.config';

interface CommandArgs {
	name?: string;
	prefix?: string;
}

export interface CommandData {
	prefix: string;
	name: string;
	method: Function;
}

export const CommandExecute = new Map();
export const PrefixStore = new Set();

export function Command({ name = '', prefix = DiscordConfig.Bot.PREFIX }: CommandArgs = {}) {
	/**
	 * @param {Object} target - The class Object
	 * @param {string} propertyKey - The name method
	 * @param {PropertyDescriptor} - Defined the function method
	 */
	return function(target: unknown, propertyKey: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value;

		if (name === '') {
			name = propertyKey;
		}
		const commandData: CommandData = {
			prefix: prefix,
			name: name,
			method: originalMethod.bind(target),
		};

		// register the command data in a map structure
		CommandExecute.set(prefix + name, commandData);
		// register the prefix
		PrefixStore.add(prefix);

		// wrapping the original method
		descriptor.value = function(...args: unknown[]) {
			return originalMethod.apply(this, args);
		};
	};
}
