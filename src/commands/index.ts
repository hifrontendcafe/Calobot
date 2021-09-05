import { InteractionReplyOptions, MessagePayload } from 'discord.js';

interface Command {
    name: string;
    description: string;
    execute(): string | MessagePayload | InteractionReplyOptions;
}

export const CommandsExecute: Command[] = [
	{
		name: 'help',
		description: 'Show help',
		execute: (): string => {
			console.log('Help Command');
			return 'Help Command';
		},
	},
	{
		name: 'ping',
		description: 'Ping the bot',
		execute: (): string => {
			console.log('Help Command');
			return 'Pong!';
		},
	},
	{
		name: 'server',
		description: 'Get server info',
		execute: (): string => {
			console.log('Help Command');
			return 'Server info';
		},
	},
	{
		name: 'user',
		description: 'Get user info',
		execute: (): string => {
			console.log('Help Command');
			return 'User info';
		},
	},
];
