import { Client } from 'discord.js';
import { messageCreate } from './messageCreate';

export const Events = (client: Client) => [
	messageCreate(client),
];
